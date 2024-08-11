pub mod local;
pub mod url;

use std::error::Error;

use ::url::Url;
use chrono::NaiveDateTime;
use local::LocalGachaSource;
use num_derive::{FromPrimitive, ToPrimitive};
use serde::{Deserialize, Serialize};
use serde_repr::{Deserialize_repr, Serialize_repr};
use snafu::Snafu;
use url::UrlGachaSource;

#[derive(Debug, Snafu)]
pub enum GachaError {
    #[snafu(display("Invalid Url: {} ", url))]
    InvalidUrl { url: String },
    #[snafu(display("Unable to probe gacha url, input it manually"))]
    ProbeFailed,
    #[snafu(display("Unable to fetch gacha from url {} since {}", url, source))]
    RequestFailed { url: Url, source: Box<dyn Error> },
}

pub enum GachaLogSource {
    Url(UrlGachaSource),
    Local(LocalGachaSource), //Probe the client cache locally
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GachaLogItem {
    #[serde(alias = "resourceId")]
    id: usize,
    #[serde(alias = "qualityLevel")]
    rarity: usize,
    name: String,
    #[serde(alias = "time", with = "date_format")]
    date: NaiveDateTime,
}
/// Convene enum which is expected to match the Wuthering Waves' official backend server protocol
///
///
/// ## Tips
///
/// - We use `Serialize_repr, Deserialize_repr` to ensure this enum to be serialized as number in ipc channel, otherwise, it will be serialized as plain string such as `"EventCharater"``.
///
#[derive(Debug, Serialize_repr, Deserialize_repr, FromPrimitive, ToPrimitive)]
#[repr(u8)]
pub enum Convene {
    EventCharacter = 1,           //角色活动唤取 Featured Resonator Convene
    EventWeapon = 2,              //武器活动唤取 Featured Weapon Convene
    PermanentCharacter = 3,       // 角色常驻唤取 Standard Resonator Convene
    PermanentWeapon = 4,          //武器常驻唤取 Standard Weapon Convene
    Beginner = 5,                 //新手唤取 Beginner Convene
    BeginnerSelected = 6,         //新手自选唤取 Beginner's Choice Convene
    BeginnerGiveBackSelected = 7, //新手自选唤取(感恩回馈) Beginner's Choice Convene（Giveback Custom Convene)
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GachaLog {
    convene: Convene,
    items: Vec<GachaLogItem>,
}

pub trait GachaService {
    async fn get_gacha_data(&self) -> Result<Vec<GachaLog>, GachaError>;
}

impl GachaService for GachaLogSource {
    async fn get_gacha_data(&self) -> Result<Vec<GachaLog>, GachaError> {
        match self {
            GachaLogSource::Url(source) => source.get_gacha_data().await,
            GachaLogSource::Local(source) => source.get_gacha_data().await,
        }
    }
}

/// To deserialize DateTime data from request
/// ## Reference
/// [custom-date-format](https://serde.rs/custom-date-format.html)
mod date_format {
    use chrono::NaiveDateTime;
    use serde::{self, Deserialize, Deserializer, Serializer};

    const FORMAT: &'static str = "%Y-%m-%d %H:%M:%S";

    // The signature of a serialize_with function must follow the pattern:
    //
    //    fn serialize<S>(&T, S) -> Result<S::Ok, S::Error>
    //    where
    //        S: Serializer
    //
    // although it may also be generic over the input types T.
    pub fn serialize<S>(date: &NaiveDateTime, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let s = format!("{}", date.format(FORMAT));
        serializer.serialize_str(&s)
    }

    // The signature of a deserialize_with function must follow the pattern:
    //
    //    fn deserialize<'de, D>(D) -> Result<T, D::Error>
    //    where
    //        D: Deserializer<'de>
    //
    // although it may also be generic over the output types T.
    pub fn deserialize<'de, D>(deserializer: D) -> Result<NaiveDateTime, D::Error>
    where
        D: Deserializer<'de>,
    {
        let s = String::deserialize(deserializer)?;
        let dt = NaiveDateTime::parse_from_str(&s, FORMAT).map_err(serde::de::Error::custom)?;
        Ok(dt)
    }
}

#[cfg(test)]
mod tests {
    use crate::gacha::date_format;
    use chrono::{NaiveDate, NaiveDateTime};
    use serde::{Deserialize, Serialize};

    #[derive(Serialize, Deserialize)]
    struct TimeStruct {
        #[serde(alias = "time", with = "date_format")]
        date: NaiveDateTime,
    }
    #[test]
    fn test_deserialize_chrono() {
        let case1 = "2024-01-01 15:35:00";
        let expected_result1: NaiveDateTime = NaiveDate::from_ymd_opt(2024, 1, 1)
            .unwrap()
            .and_hms_opt(15, 35, 00)
            .unwrap();
        let result1 = NaiveDateTime::parse_from_str(&case1, "%Y-%m-%d %H:%M:%S").unwrap();
        assert_eq!(expected_result1, result1)
    }

    #[test]
    fn test_deserialize_json_chrono() {
        let case1 = r#"{"time":"2024-01-01 15:35:00"}"#;
        let expected_result1: NaiveDateTime = NaiveDate::from_ymd_opt(2024, 1, 1)
            .unwrap()
            .and_hms_opt(15, 35, 00)
            .unwrap();
        let result1: TimeStruct = serde_json::from_str(case1).unwrap();
        assert_eq!(expected_result1, result1.date)
    }
}
