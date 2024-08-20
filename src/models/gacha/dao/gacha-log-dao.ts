import { Convene } from "../convene";
import { IGachaItemDao, GachaItemDao } from "./gacha-item-dao";

export interface IGachaLogDao {
  convene: Convene;
  items: IGachaItemDao[];
}
export class GachaLogDao implements IGachaLogDao {
  convene: Convene;
  items: GachaItemDao[];
  constructor(convene: Convene, items: GachaItemDao[]) {
    this.convene = convene;
    this.items = items;
  }
  public static initEmptyGachaLogDao(convene: Convene) {
    return new GachaLogDao(convene, []);
  }
}
