import { invoke } from "@tauri-apps/api/core";

export async function getGachaLogFromUrl(url:string) {
  return invoke<GachaLog[]>("get_gachalog_from_url",{url});
}