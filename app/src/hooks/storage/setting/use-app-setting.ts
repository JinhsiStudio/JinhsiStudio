import { defaultLanguage } from "@/services/i18n";
import useStorage, { StorageNameSpace } from "../use-storage";
import { AppSetting, IAppSetting } from "@/models/setting/app-setting";

export const useAppSetting = () =>
  useStorage<IAppSetting>(
    StorageNameSpace.APP_SETTING,
    "app_setting",
    new AppSetting(defaultLanguage),
  );
