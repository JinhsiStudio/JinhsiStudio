import { GachaLog } from "@/models/gacha/gacha-log";
import { invoke } from "@tauri-apps/api/core";

export async function getGachaLogFromUrl(url:string):Promise<GachaLog[]|void> {
  console.log("getGachaLogFromUrl",url);
  return invoke<GachaLog[]|void>("get_gachalog_from_url",{url}).catch((error) => console.error(error));
}