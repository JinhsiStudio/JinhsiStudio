import useStorage, { StorageNameSpace } from "../use-storage";
import {
  GachaLogArchive,
  IGachaLogArchive,
} from "@/models/gacha/dao/gacha-archive";

export const useGachaArchive = (uid: number) =>
  useStorage<IGachaLogArchive>(
    StorageNameSpace.GACHA_ARCHIVE,
    `gacha_data_${uid}`,
    GachaLogArchive.initEmptyGachaLogArchive(uid),
  );
