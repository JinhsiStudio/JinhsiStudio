import { Convene } from "./convene";
import { GachaLog, IGachaLog } from "./gacha-log";

export interface IGachaLogArchive {
  uid: number;
  logs: IGachaLog[];
}
export class GachaLogArchive implements IGachaLogArchive {
  uid: number;
  logs: GachaLog[];

  constructor(uid: number, logs: GachaLog[]) {
    this.uid = uid;
    this.logs = logs;
  }

  public static initEmptyGachaLogArchive(uid: number) {
    return new GachaLogArchive(uid, [
      GachaLog.initEmptyGachaLog(Convene.Beginner),
      GachaLog.initEmptyGachaLog(Convene.BeginnerGiveBackSelected),
      GachaLog.initEmptyGachaLog(Convene.BeginnerSelected),
      GachaLog.initEmptyGachaLog(Convene.EventCharacter),
      GachaLog.initEmptyGachaLog(Convene.EventWeapon),
      GachaLog.initEmptyGachaLog(Convene.PermanentCharacter),
      GachaLog.initEmptyGachaLog(Convene.PermanentWeapon),
    ]);
  }
}
