import { Convene } from "../convene";
import { GachaLogDao, IGachaLogDao } from "./gacha-log-dao";

export interface IGachaLogArchive {
  uid: number;
  logs: IGachaLogDao[];
}
export class GachaLogArchive implements IGachaLogArchive {
  uid: number;
  logs: GachaLogDao[];

  constructor(uid: number, logs: GachaLogDao[]) {
    this.uid = uid;
    this.logs = logs;
  }

  public static initEmptyGachaLogArchive(uid: number): GachaLogArchive {
    return new GachaLogArchive(uid, [
      GachaLogDao.initEmptyGachaLogDao(Convene.Beginner),
      GachaLogDao.initEmptyGachaLogDao(Convene.BeginnerGiveBackSelected),
      GachaLogDao.initEmptyGachaLogDao(Convene.BeginnerSelected),
      GachaLogDao.initEmptyGachaLogDao(Convene.EventCharacter),
      GachaLogDao.initEmptyGachaLogDao(Convene.EventWeapon),
      GachaLogDao.initEmptyGachaLogDao(Convene.PermanentCharacter),
      GachaLogDao.initEmptyGachaLogDao(Convene.PermanentWeapon),
    ]);
  }
}
