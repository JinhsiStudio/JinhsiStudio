import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {
  ILanguageSetting,
  LanguageSetting,
} from "@/models/setting/app-setting";
import { getLocaleTranslation } from "@/locales";

export const supportedLanguages: ILanguageSetting[] = [
  new LanguageSetting("en_US", "English"),
  new LanguageSetting("zh_CN", "简体中文"),
];
export const defaultLanguage = supportedLanguages[0];

export const defaultNS = "general";
export const resources = {
  en_US: getLocaleTranslation("en_US"),
  zh_CN: getLocaleTranslation("zh_CN"),
} as const;

i18n.use(initReactI18next).init({
  lng: defaultLanguage.identifier,
  fallbackLng: defaultLanguage.identifier,
  ns: ["general", "gacha", "setting"],
  defaultNS,
  resources,
});
