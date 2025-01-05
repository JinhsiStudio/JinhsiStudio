import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {
  ILanguageSetting,
  LanguageSetting,
} from "@/models/setting/app-setting";
import { en_US_Traslations, zh_CN_Traslations } from "@/locales";

export const supportedLanguages: ILanguageSetting[] = [
  new LanguageSetting("en_US", "English"),
  new LanguageSetting("zh_CN", "简体中文"),
];
export const defaultLanguage = supportedLanguages[0];

export const defaultNS = "general";
export const resources = {
  en_US: en_US_Traslations,
  zh_CN: zh_CN_Traslations,
} as const;

i18n.use(initReactI18next).init({
  lng: defaultLanguage.identifier,
  fallbackLng: defaultLanguage.identifier,
  ns: ["general", "gacha", "setting"],
  defaultNS,
  resources,
});
