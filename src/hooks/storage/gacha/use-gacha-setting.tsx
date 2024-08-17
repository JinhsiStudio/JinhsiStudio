import { GachaSetting, IGachaSetting } from "@/models/gacha/gacha-setting";
import useStorage from "../use-storage";

export const useGachaSetting = () =>
  useStorage<IGachaSetting>("gacha_setting", new GachaSetting("", ""));
