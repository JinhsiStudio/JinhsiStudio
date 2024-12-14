import { GachaSetting, IGachaSetting } from "@/models/gacha/gacha-setting";
import useStorage, { StorageNameSpace } from "../use-storage";

export const useGachaSetting = () =>
  useStorage<IGachaSetting>(
    StorageNameSpace.GACHA_SETTING,
    "gacha_setting",
    new GachaSetting("", ""),
  );
