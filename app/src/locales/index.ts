import enCommon from "./en_US/general/common.json";
import enMessage from "./en_US/general/message.json";
import enGachaCommon from "./en_US/gacha/common.json";
import enGachaMessage from "./en_US/gacha/message.json";
import enGachaResource from "./en_US/gacha/resource.json";
import enSettingCommon from "./en_US/setting/common.json";

import zhCommon from "./zh_CN/general/common.json";
import zhMessage from "./zh_CN/general/message.json";
import zhGachaCommon from "./zh_CN/gacha/common.json";
import zhGachaMessage from "./zh_CN/gacha/message.json";
import zhGachaResource from "./zh_CN/gacha/resource.json";
import zhSettingCommon from "./zh_CN/setting/common.json";

const translations = {
  en_US: {
    general: {
      common: enCommon,
      message: enMessage,
    },
    gacha: {
      common: enGachaCommon,
      message: enGachaMessage,
      resource: enGachaResource,
    },
    setting: {
      common: enSettingCommon,
    },
  },
  zh_CN: {
    general: {
      common: zhCommon,
      message: zhMessage,
    },
    gacha: {
      common: zhGachaCommon,
      message: zhGachaMessage,
      resource: zhGachaResource,
    },
    setting: {
      common: zhSettingCommon,
    },
  },
} as const;

type Translation = typeof translations.en_US;
type SupportedLocale = keyof typeof translations;

export function getLocaleTranslation(locale: SupportedLocale): Translation {
  switch (locale) {
    case "en_US":
      return translations.en_US;
    case "zh_CN":
      return translations.zh_CN;
  }
}
