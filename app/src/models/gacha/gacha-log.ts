import { Convene } from "./convene";
import { GachaLogDao, IGachaLogDao } from "./dao/gacha-log-dao";
import { GachaItem, IGachaItem } from "./gacha-item";

export interface IGachaLog {
  convene: Convene;
  items: IGachaItem[];
  intoDao(): IGachaLogDao;
}
export class GachaLog implements IGachaLog {
  constructor(convene: Convene, items: GachaItem[]) {
    this.convene = convene;
    this.items = items;
  }
  convene: Convene;
  items: GachaItem[];
  public static fromDao(dao: IGachaLogDao): IGachaLog {
    return new GachaLog(
      dao.convene,
      dao.items.map((item) => GachaItem.fromDao(item)),
    );
  }
  public intoDao(): IGachaLogDao {
    return new GachaLogDao(
      this.convene,
      this.items.map((item) => item.intoDao()),
    );
  }
  public static initEmptyGachaLog(convene: Convene): GachaLog {
    return new GachaLog(convene, []);
  }
}

export function getDummyGachaData(): GachaLog[] {
  return [
    new GachaLog(Convene.Beginner, []),
    new GachaLog(Convene.BeginnerGiveBackSelected, []),
  ];
}
