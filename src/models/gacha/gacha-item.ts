import dayjs, { Dayjs } from "dayjs";
import { GachaItemDao, IGachaItemDao } from "./dao/gacha-item-dao";

export interface IGachaItem {
  id: number;
  rarity: number;
  name: string;
  date: Dayjs;
  intoDao(): IGachaItemDao;
}

export class GachaItem implements IGachaItem {
  constructor(id: number, rariry: number, name: string, date: Dayjs) {
    this.id = id;
    this.rarity = rariry;
    this.name = name;
    this.date = date;
  }
  id: number;
  rarity: number;
  name: string;
  date: Dayjs;
  public static fromDao(dao: IGachaItemDao): GachaItem {
    return new GachaItem(dao.id, dao.rarity, dao.name, dayjs(dao.date));
  }
  intoDao(): IGachaItemDao {
    return new GachaItemDao(
      this.id,
      this.rarity,
      this.name,
      this.date.format("YYYY-MM-DD HH:mm:ss"), //see /core/src/gacha
    );
  }
}
