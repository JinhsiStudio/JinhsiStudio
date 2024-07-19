use jinhsi_core::gacha::{url::UrlGachaSource, GachaError, GachaLog, GachaService};
use url::Url;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn get_gachalog(name: &str) -> Result<Vec<GachaLog>, String> {
    let source = UrlGachaSource::new(Url::parse(name).unwrap()).unwrap();
    return source.get_gacha_data().await.map_err(|e| format!("{}", e));
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![get_gachalog])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
