import { GachaLogDao, IGachaLogDao } from "@/models/gacha/dao/gacha-log-dao";
// import { GachaLog } from "@/models/gacha/gacha-log";
import { invoke } from "@tauri-apps/api/core";

// export async function getGachaLogFromUrl(
//   url: string,
// ): Promise<GachaLog[] | void> {
//   console.log("getGachaLogFromUrl", url);
//   let daoData = invoke<GachaLogDao[] | void>("get_gachalog_from_url", {
//     url,
//   });
//   return daoData.then((data) => data?.map(GachaLog.fromDao));
// }
// export async function getGachaLogFromLocal(
//   path: string | null,
// ): Promise<GachaLog[] | void> {
//   console.log("getGachaLogFromLocal", path);
//   let daoData = invoke<GachaLogDao[] | void>("get_gachalog_from_local", {
//     path,
//   });
//   return daoData.then((data) => data?.map(GachaLog.fromDao));
// }
export async function updateGachaLogFromUrl(
  data: IGachaLogDao[],
  url: string,
): Promise<GachaLogDao[] | void> {
  console.log("updateGachaLogFromUrl", url);
  return invoke<GachaLogDao[] | void>("update_gachalog_from_url", {
    data,
    url,
  });
}
export async function updateGachaLogFromLocal(
  data: IGachaLogDao[],
  path: string | null,
): Promise<GachaLogDao[] | void> {
  console.log("updateGachaLogFromLocal", path);
  return invoke<GachaLogDao[] | void>("update_gachalog_from_local", {
    data,
    path,
  });
}
