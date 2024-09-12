mod cmd;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let builder = tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            cmd::gacha::get_gachalog_from_url,
            cmd::gacha::get_gachalog_from_local,
            cmd::gacha::update_gachalog_from_url,
            cmd::gacha::update_gachalog_from_local,
        ]);
    #[cfg(all(
        not(any(target_os = "android", target_os = "ios")),
        not(debug_assertions),
        not(dev)
    ))]
    let builder = builder.plugin(tauri_plugin_updater::Builder::new().build());
    builder
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
