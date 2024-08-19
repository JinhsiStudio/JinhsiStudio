import { GachaLogDao } from "@/models/gacha/dao/gacha-log-dao";
import { GachaLog } from "@/models/gacha/gacha-log";
import { invoke } from "@tauri-apps/api/core";

export async function getGachaLogFromUrl(
  url: string,
): Promise<GachaLog[] | void> {
  console.log("getGachaLogFromUrl", url);
  let daoData = invoke<GachaLogDao[] | void>("get_gachalog_from_url", {
    url,
  });
  return daoData.then((data) => data?.map(GachaLog.fromDao));
}
export async function getGachaLogFromLocal(
  path: string | null,
): Promise<GachaLog[] | void> {
  console.log("getGachaLogFromLocal", path);
  let daoData = invoke<GachaLogDao[] | void>("get_gachalog_from_local", {
    path,
  });
  return daoData.then((data) => data?.map(GachaLog.fromDao));
}
export async function updateGachaLogFromUrl(
  data: GachaLog[] | null,
  url: string,
): Promise<GachaLog[] | void> {
  console.log("getGachaLogFromUrl", url);
  let daoData = invoke<GachaLogDao[] | void>("update_gachalog_from_url", {
    data,
    url,
  });
  return daoData.then((data) => data?.map(GachaLog.fromDao));
}
export async function updateGachaLogFromLocal(
  data: GachaLog[] | null,
  path: string | null,
): Promise<GachaLog[] | void> {
  console.log("getGachaLogFromLocal", path);
  let daoData = invoke<GachaLogDao[] | void>("update_gachalog_from_local", {
    data,
    path,
  });
  return daoData.then((data) => data?.map(GachaLog.fromDao));
}
