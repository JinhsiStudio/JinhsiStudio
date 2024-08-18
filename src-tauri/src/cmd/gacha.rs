use std::{path::PathBuf, str::FromStr};

use jinhsi_core::gacha::{local::LocalGachaSource, url::UrlGachaSource, GachaLog, GachaService};

use super::handle_error;

#[tauri::command]
pub(crate) async fn get_gachalog_from_url(url: String) -> Result<Vec<GachaLog>, String> {
    let source = UrlGachaSource::new(url).map_err(handle_error)?;
    return source.get_gacha_data().await.map_err(handle_error);
}

#[tauri::command]
pub(crate) async fn get_gachalog_from_local(path: Option<String>) -> Result<Vec<GachaLog>, String> {
    let path = {
        if let Some(s) = &path {
            if let Ok(pb) = PathBuf::from_str(s) {
                Some(pb)
            } else {
                log::error!("invalid path {:?}", path);
                None
            }
        } else {
            None
        }
    };
    let source = LocalGachaSource::new(path);
    return source.get_gacha_data().await.map_err(handle_error);
}
