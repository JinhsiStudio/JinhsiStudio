import { GachaLogDao } from "@/models/gacha/dao/gacha-log-dao";
import { GachaLog } from "@/models/gacha/gacha-log";
import { invoke } from "@tauri-apps/api/core";

export async function getGachaLogFromUrl(
  url: string,
): Promise<GachaLog[] | void> {
  console.log("getGachaLogFromUrl", url);
  let daoData = invoke<GachaLogDao[] | void>("get_gachalog_from_url", {
    url,
  }).catch((error) => console.error(error));
  return daoData.then((data) => data?.map(GachaLog.fromDao));
}
export async function getGachaLogFromLocal(
  path: string | null,
): Promise<GachaLog[] | void> {
  console.log("getGachaLogFromUrl", path);
  let daoData = invoke<GachaLogDao[] | void>("get_gachalog_from_local", {
    path,
  }).catch((error) => console.error(error));
  return daoData.then((data) => data?.map(GachaLog.fromDao));
}
