pub mod url;

use core::error::Error;
use serde::{Deserialize, Serialize};
use std::{fmt::Display, path::PathBuf};

#[derive(Debug, Serialize, Deserialize)]
pub enum GachaError {
    InvalidUrl(String),
}

impl Display for GachaError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            GachaError::InvalidUrl(url) => write!(f, "Gacha Url {} Invalid", url),
        }
    }
}

impl Error for GachaError {}

pub enum GachaLogSource {
    Url(String),
    Local(PathBuf), //Probe the client cache locally
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
    async fn get_gacha_data(&self) -> Result<Vec<GachaLog>, GachaError>;
}
