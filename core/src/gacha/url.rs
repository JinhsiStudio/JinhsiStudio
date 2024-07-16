use lazy_static::lazy_static;
use url::Url;

use super::GachaService;

lazy_static! {
    static ref GACHA_RECORD_BASE_URL: Url =
        Url::parse("https://gmserver-api.aki-game2.com/gacha/record/query").unwrap();
}

pub struct UrlGachaSource {
    pub(super) url: url::Url,
}

impl GachaService for UrlGachaSource {
    fn get_gacha_data(&self) -> Result<Vec<super::GachaLog>, super::GachaError> {
        todo!()
    }
}
