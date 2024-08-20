import useStorage from "../use-storage";
import {
  GachaLogArchive,
  IGachaLogArchive,
} from "@/models/gacha/dao/gacha-archive";

export const useGachaArchive = (uid: number) =>
  useStorage<IGachaLogArchive>(
    `gacha_data_${uid}`,
    GachaLogArchive.initEmptyGachaLogArchive(uid),
  );
