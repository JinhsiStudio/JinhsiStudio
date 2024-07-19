import { invoke } from "@tauri-apps/api/core";

export async function getGachaLog() {
  return invoke<IGachaLog>("get_gachalog");
}