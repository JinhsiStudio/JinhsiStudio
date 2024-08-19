import { IGachaLog } from "@/models/gacha/gacha-log";
import useStorage from "../use-storage";

export const useGachaData = () =>
  useStorage<IGachaLog[] | null>("gacha_data", null);
