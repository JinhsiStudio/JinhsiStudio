import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en_US_common from "@/locales/en_US/common.json";
import en_US_resource from "@/locales/en_US/resource.json";
import en_US_message from "@/locales/en_US/message.json";
import zh_CN_common from "@/locales/zh_CN/common.json";
import zh_CN_resource from "@/locales/zh_CN/resource.json";
import zh_CN_message from "@/locales/zh_CN/message.json";
import {
  ILanguageSetting,
  LanguageSetting,
} from "@/models/setting/app-setting";

export const supportedLanguages: ILanguageSetting[] = [
  new LanguageSetting("en_US", "English"),
  new LanguageSetting("zh_CN", "简体中文"),
];
export const defaultLanguage = supportedLanguages[0];

export const defaultNS = "common";
export const resources = {
  en_US: {
    common: en_US_common,
    resource: en_US_resource,
    message: en_US_message,
  },
  zh_CN: {
    common: zh_CN_common,
    resource: zh_CN_resource,
    message: zh_CN_message,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: defaultLanguage.identifier,
  fallbackLng: defaultLanguage.identifier,
  ns: ["common", "resource", "message"],
  defaultNS,
  resources,
});
