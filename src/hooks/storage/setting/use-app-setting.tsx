
import { defaultLanguage } from "@/services/i18n";
import useStorage from "../use-storage";
import { AppSetting, IAppSetting } from "@/models/setting/app-setting";

export const useAppSetting = () => useStorage<IAppSetting>("app_setting", new AppSetting(defaultLanguage))