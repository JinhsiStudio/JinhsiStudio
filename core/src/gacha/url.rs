use std::collections::HashMap;

use crate::gacha::GachaError;
use lazy_static::lazy_static;
use reqwest::Client;
use tokio::test;
use url::Url;

use super::{Convene, GachaLog, GachaLogItem, GachaService};

lazy_static! {
    static ref GACHA_RECORD_BASE_URL: Url =
        Url::parse("https://gmserver-api.aki-game2.com/gacha/record/query").unwrap();
}

pub struct UrlGachaSource {
    url: url::Url,
    query: HashMap<String, String>,
}

impl UrlGachaSource {
    pub(crate) fn new(raw_url: Url) -> Result<Self, GachaError> {
        let normalized_url = Url::parse(
            &("https://example.com".to_owned() + raw_url.fragment().unwrap()), // The Url looks like https://aki-gm-resources.aki-game.com/aki/gacha/index.html#/record?svr_id=xxxxxxx, which hides the query behind fragment. So we need to mock a fake base domain to make it works
        )
        .map_err(|_| GachaError::InvalidUrl {
            url: raw_url.to_string(),
        })?;
        let mut query_map = HashMap::new();
        for query in normalized_url.query_pairs() {
            let r = query_map.insert(query.0.to_string(), query.1.to_string());
            debug_assert!(r.is_none());
        }
        return Ok(Self {
            url: raw_url,
            query: query_map,
        });
    }
    fn get_query_data(&self, key: &str) -> Result<String, GachaError> {
        self.query
            .get(key)
            .ok_or(GachaError::InvalidUrl {
                url: self.url.to_string(),
            })
            .map(|x| x.to_owned())
    }
}

impl GachaService for UrlGachaSource {
    async fn get_gacha_data(&self) -> Result<Vec<GachaLog>, GachaError> {
        let convene_id = self.get_query_data("resources_id")?;
        let server_id = self.get_query_data("svr_id")?;
        let language = self.get_query_data("lang")?;
        let player_id = self.get_query_data("player_id")?;
        let record_id = self.get_query_data("record_id")?;
        let mut params = HashMap::new();
        params.insert("convene_id", convene_id);
        params.insert("server_id", server_id);
        params.insert("lang", language);
        params.insert("player_id", player_id);
        params.insert("record_id", record_id);
        let client = Client::new();
        let mut res: Vec<GachaLog> = Vec::new();
        for convene_id in 1..6 {
            let request = client
                .get(GACHA_RECORD_BASE_URL.as_str())
                .query(&params)
                .query(&("cardPoolType", convene_id));
            let response = request
                .send()
                .await
                .map_err(|_| GachaError::RequestFailed {
                    url: GACHA_RECORD_BASE_URL.clone(),
                })?;
            let response_text = response
                .text()
                .await
                .map_err(|_| GachaError::RequestFailed {
                    url: GACHA_RECORD_BASE_URL.clone(),
                })?;
            let items: Vec<GachaLogItem> =
                serde_json::from_str(&response_text).map_err(|_| GachaError::RequestFailed {
                    url: GACHA_RECORD_BASE_URL.clone(),
                })?;
            res.push(GachaLog {
                convene: Convene::Beginner,
                items,
            })
        }
        return Ok(res);
    }
}

// #[tokio::test]
// async fn test_get_gacha_data() {
//     use std::env;
//     // let raw_url = env::var("GACHA_TEST_URL").unwrap();
//     let raw_url = "https://aki-gm-resources.aki-game.com/aki/gacha/index.html#/record?svr_id=76402e5b20be2c39f095a152090afddc&player_id=117668137&lang=zh-Hans&gacha_id=4&gacha_type=6&svr_area=cn&record_id=17f6b1abb3f5b97dfbf8d80bf269deb0&resources_id=917dfa695d6c6634ee4e972bb9168f6a".to_string();
//     let source = UrlGachaSource::new(Url::parse(&raw_url).unwrap()).unwrap();
//     let r = source.get_gacha_data().await;
//     assert!(r.unwrap().len() > 0);
// }
