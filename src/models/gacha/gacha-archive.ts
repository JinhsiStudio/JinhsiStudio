import { GachaLog, IGachaLog } from "./gacha-log";

export interface IGachaLogArchive {
  uid: number;
  logs: IGachaLog[];
}
export class GachaLogArchive implements IGachaLogArchive {
  constructor(uid: number, logs: GachaLog[]) {
    this.uid = uid;
    this.logs = logs;
  }
  public static initEmptyGachaLogArchive(uid: number) {
    return new GachaLogArchive(uid, []);
  }
  uid: number;
  logs: GachaLog[];
}
