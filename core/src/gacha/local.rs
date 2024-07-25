use std::{
    borrow::Borrow,
    fs::OpenOptions,
    io::{BufReader, Seek, SeekFrom},
    path::{Path, PathBuf},
};

use ::url::Url;

use super::{url::UrlGachaSource, GachaError, GachaService};

pub struct LocalGachaSource {
    path: Option<PathBuf>,
}

impl LocalGachaSource {
    pub fn new(path: Option<PathBuf>) -> Self {
        Self { path }
    }

    /// Get Url Locally, inspired by [this](https://gist.githubusercontent.com/Luzefiru/19c0759bea1b9e7ef480bb39303b3f6c/raw/529a4a53a265e0ee15f48e086654d66529cdb157/get-url.ps1)
    fn try_get_url(&self) -> Result<Url, GachaError> {
        #[cfg(not(target_os = "windows"))]
        return Err(GachaError::ProbeFailed);
        #[cfg(target_os = "windows")]
        {
            use regex::Regex;
            use std::io;
            use std::io::BufRead;
            use winreg::enums::*;
            use winreg::RegKey;
            const MAX_LOG_LINES: usize = 500; //Just read last 500 lines to avoid timeout
            fn read_last_lines<P: AsRef<Path>>(
                filename: P,
                lines_count: usize,
            ) -> io::Result<Vec<String>> {
                let mut file = OpenOptions::new()
                    .read(true)
                    .write(false)
                    .create(false)
                    .open(filename)?;
                let metadata = file.metadata()?;
                let file_size = metadata.len();

                // Calculate the size of each chunk to read
                let chunk_size = if file_size > (lines_count - 1) as u64 * 128 {
                    128 // If file size is large, we can read in larger chunks
                } else {
                    1 // If file size is small, read one byte at a time
                };

                let mut lines = Vec::new();
                let mut offset = file_size - chunk_size as u64;

                while offset > 0 && lines.len() < lines_count {
                    // Move the cursor to the calculated offset
                    file.seek(SeekFrom::Start(offset))?;

                    let reader = BufReader::new(file.borrow());

                    // Read lines from the current offset to the end of the file
                    for line in reader.lines().flatten() {
                        if lines.len() < lines_count {
                            lines.push(line);
                        } else {
                            break;
                        }
                    }

                    // Adjust the offset for the next iteration
                    let lines_read = lines.len();
                    offset -= chunk_size as u64 * lines_read as u64;
                    if offset < chunk_size as u64 {
                        // If the remaining part of the file is smaller than chunk_size, read it entirely
                        offset = 0;
                    }
                }

                // If we have read more lines than needed, truncate the vector
                if lines.len() > lines_count {
                    lines.truncate(lines_count);
                }

                // seek to the beginning of the file to reset the cursor
                file.seek(SeekFrom::Start(0))?;

                Ok(lines)
            }
            fn check_registry() -> Result<Option<String>, GachaError> {
                let hklm = RegKey::predef(HKEY_LOCAL_MACHINE);
                let paths = vec![
                    "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall",
                    "SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall",
                ];

                for path in paths {
                    if let Ok(subkey) = hklm.open_subkey(path) {
                        for (name, _value) in subkey.enum_values().filter_map(Result::ok) {
                            if name.contains("wuthering") {
                                if let Ok(install_path) = subkey.get_value::<String, _>(&name) {
                                    return Ok(Some(install_path));
                                }
                            }
                        }
                    }
                }
                Ok(None)
            }
            fn check_mui_cache() -> Result<Option<String>, GachaError> {
                let hkcu = RegKey::predef(HKEY_CURRENT_USER);
                let path = "Software\\Classes\\Local Settings\\Software\\Microsoft\\Windows\\Shell\\MuiCache";

                if let Ok(subkey) = hkcu.open_subkey(path) {
                    for (name, value) in subkey.enum_values().filter_map(Result::ok) {
                        if value.to_string().contains("wuthering")
                            && name.contains("client-win64-shipping.exe")
                        {
                            let game_path =
                                name.split("\\client\\").next().unwrap_or("").to_string();
                            return Ok(Some(game_path));
                        }
                    }
                }
                Ok(None)
            }

            fn check_firewall() -> Result<Option<String>, GachaError> {
                let hklm = RegKey::predef(HKEY_LOCAL_MACHINE);
                let path = "SYSTEM\\CurrentControlSet\\Services\\SharedAccess\\Parameters\\FirewallPolicy\\FirewallRules";

                if let Ok(subkey) = hklm.open_subkey(path) {
                    for (name, value) in subkey.enum_values().filter_map(Result::ok) {
                        if value.to_string().contains("wuthering")
                            && name.contains("client-win64-shipping")
                        {
                            let game_path = value
                                .to_string()
                                .split("App=")
                                .nth(1)
                                .unwrap_or("")
                                .split("\\client\\")
                                .next()
                                .unwrap_or("")
                                .to_string();
                            return Ok(Some(game_path));
                        }
                    }
                }
                Ok(None)
            }

            fn check_common_paths() -> Option<String> {
                let disk_letters = vec!["C", "D", "E", "F", "G"];
                //TODO Wegame path
                let common_paths = vec![
                    "\\Wuthering Waves Game",
                    "\\Wuthering Waves\\Wuthering Waves Game",
                    "\\Program Files\\Epic Games\\WutheringWavesj3oFh",
                    "\\Program Files\\Epic Games\\WutheringWavesj3oFh\\Wuthering Waves Game",
                ];

                for disk_letter in disk_letters {
                    for common_path in &common_paths {
                        let path = format!("{}:{}", disk_letter, common_path);
                        if Path::new(&path).exists() {
                            return Some(path);
                        }
                    }
                }
                None
            }

            fn log_check<P: AsRef<Path>>(game_path: P) -> Option<String> {
                let gacha_log_path = game_path.as_ref().join("\\Client\\Saved\\Logs\\Client.log");
                let debug_log_path = game_path.as_ref().join("\\Client\\Binaries\\Win64\\ThirdParty\\KrPcSdk_Global\\KRSDKRes\\KRSDKWebView\\debug.log");

                let mut url_to_copy = None;
                let mut log_found = false;

                if gacha_log_path.as_path().exists() {
                    log_found = true;
                    log::info!("Reading Client.log...");
                    if let Ok(lines) = read_last_lines(&gacha_log_path, MAX_LOG_LINES) {
                        let re = Regex::new(
                                 r"https://aki-gm-resources\.aki-game\.com/aki/gacha/index\.html#\/record\?svr_id=[0-9a-f]{32}&player_id=[0-9]+&lang=[\w-]+&gacha_id=[0-9]+&gacha_type=[0-9]+&svr_area=[\w]+&record_id=[0-9a-f]{32}&resources_id=[0-9a-f]{32}",
                            )
                            .unwrap();
                        for line in lines {
                            if re.is_match(&line) {
                                url_to_copy = Some(re.find(&line).unwrap().as_str().to_string());
                                break;
                            }
                        }
                    }
                }

                if debug_log_path.as_path().exists() && url_to_copy.is_none() {
                    log_found = true;
                    log::info!("Reading debug.log...");
                    if let Ok(lines) = read_last_lines(&debug_log_path, MAX_LOG_LINES) {
                        for line in lines {
                            let re = Regex::new(r#""url": "(https://aki-gm-resources(-oversea)?\.aki-game\.(net|com)[^"]*)""#).unwrap();
                            if let Some(caps) = re.captures(&line) {
                                url_to_copy = Some(caps.get(1).unwrap().as_str().to_string());
                                break;
                            }
                        }
                    }
                }

                if let Some(url) = url_to_copy {
                    log::info!("\nConvene Record URL: {}", url);
                    Some(url)
                } else if log_found {
                    log::warn!("Cannot find the convene history URL in both Client.log and debug.log! Please open your Convene History first!");
                    None
                } else {
                    log::info!("Cannot find logs from provided path.");
                    None
                }
            }

            // Manual input
            if let Some(path) = &self.path {
                log::info!("Game path from user input: {:?}", path);
                if let Some(raw_url) = log_check(path) {
                    if let Ok(url) = Url::parse(&raw_url) {
                        return Ok(url);
                    }
                }
            } else {
                log::info!("No game path specified, trying to probe the game path automatically");
            }

            log::info!("Attempting to find URL automatically...");

            // Check registry for game path
            if let Some(path) = check_registry()? {
                log::info!("Game path from registry: {:?}", path);
                if let Some(raw_url) = log_check(&path) {
                    if let Ok(url) = Url::parse(&raw_url) {
                        return Ok(url);
                    }
                }
            } else {
                log::info!("Game path not found in registry.");
            }

            // Check MUI Cache
            log::info!("Checking MUI Cache...");
            if let Some(path) = check_mui_cache()? {
                log::info!("Game path from MUI Cache: {:?}", path);
                if let Some(raw_url) = log_check(&path) {
                    if let Ok(url) = Url::parse(&raw_url) {
                        return Ok(url);
                    }
                }
            } else {
                log::info!("Game path not found in registry.");
            }

            // Check Firewall rules
            log::info!("Checking Firewall rules...");
            if let Some(path) = check_firewall()? {
                log::info!("Game path from Firewall rules: {:?}", path);
                if let Some(raw_url) = log_check(&path) {
                    if let Ok(url) = Url::parse(&raw_url) {
                        return Ok(url);
                    }
                }
            } else {
                log::info!("Game path not found in registry.");
            }

            // Check common installation paths
            log::info!("Checking common installation paths...");
            if let Some(path) = check_common_paths() {
                log::info!("Game path from common installation paths: {:?}", path);
                if let Some(raw_url) = log_check(&path) {
                    if let Ok(url) = Url::parse(&raw_url) {
                        return Ok(url);
                    }
                }
            } else {
                log::info!("Game path not found in registry.");
            }

            Err(GachaError::ProbeFailed)
        }
    }
}

impl GachaService for LocalGachaSource {
    async fn get_gacha_data(&self) -> Result<Vec<super::GachaLog>, GachaError> {
        let url_source = UrlGachaSource::new(self.try_get_url()?)?;
        url_source.get_gacha_data().await
    }
}

#[test]
/// If Wurthering Waves has been installed in your computer,
/// you can uncomment the following line to test it.
/// Otherwise, keep it to make test happy
fn test_probe_local() {
    let r = LocalGachaSource::new(None).try_get_url();
    // assert!(r.is_ok());
    // if let Ok(url) = r {
    //     println!("probe result {:?}", url);
    //     let normalized_url =
    //         Url::parse(&("https://example.com".to_owned() + url.fragment().unwrap()));
    //     println!("probe query result {:?}", normalized_url);
    // }
    assert!(r.is_err());
}
