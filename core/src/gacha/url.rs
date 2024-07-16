use super::GachaService;

pub struct UrlGachaSource {
    pub(super) url: String,
}

impl GachaService for UrlGachaSource {
    fn get_gacha_data(&self) -> Result<Vec<super::GachaLog>, super::GachaError> {
        todo!()
    }
}
