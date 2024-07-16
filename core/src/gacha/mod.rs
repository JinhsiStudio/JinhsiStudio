pub mod local;
pub mod url;

use local::LocalGachaSource;
use serde::{Deserialize, Serialize};
use snafu::Snafu;
use url::UrlGachaSource;

#[derive(Debug, Snafu, Serialize, Deserialize)]
pub enum GachaError {
    #[snafu(display("Unable to write result to {}: ", url))]
    InvalidUrl { url: String },
    #[snafu(display("Unable to probe gacha url, input it manually"))]
    ProbeFailed,
}

pub enum GachaLogSource {
    Url(UrlGachaSource),
    Local(LocalGachaSource), //Probe the client cache locally
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GachaLogItem {
    date: chrono::NaiveDate,
    name: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum Banner {
    Beginner,
    EventCharacter,
    EventWeapon,
    PermanentCharacter,
    PermanentWeapon,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GachaLog {
    banner: Banner,
    items: Vec<GachaLogItem>,
}

pub trait GachaService {
    fn get_gacha_data(&self) -> Result<Vec<GachaLog>, GachaError>;
}

impl GachaService for GachaLogSource {
    fn get_gacha_data(&self) -> Result<Vec<GachaLog>, GachaError> {
        match self {
            GachaLogSource::Url(source) => source.get_gacha_data(),
            GachaLogSource::Local(source) => source.get_gacha_data(),
        }
    }
}
