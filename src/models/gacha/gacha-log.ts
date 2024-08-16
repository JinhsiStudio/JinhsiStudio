import { Convene } from "./convene";
import { IGachaLogDao } from "./dao/gacha-log-dao";
import { GachaItem, IGachaItem } from "./gacha-item";

export interface IGachaLog {
  convene: Convene;
  items: IGachaItem[];
}
export class GachaLog implements IGachaLog {
  constructor(convene: Convene, items: GachaItem[]) {
    this.convene = convene;
    this.items = items;
  }
  convene: Convene;
  items: GachaItem[];
  public static fromDao(dao: IGachaLogDao): GachaLog {
    return new GachaLog(
      dao.convene,
      dao.items.map((item) => GachaItem.fromDao(item)),
    );
  }
}
