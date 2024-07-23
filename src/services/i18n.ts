import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en_US_common from "@/locales/en_US/common.json";
import zh_CN_common from "@/locales/zh_CN/common.json";

export const supportedLanguages = 
    [
        {
            value:'en_US',
            label:'English'
        },
        {
            value:'zh_CN',
            label:'简体中文',
        }
    ]

export const defaultNS = "common";
export const resources = {
  en_US: {
    common:en_US_common,
  },
  zh_CN:{
    common:zh_CN_common,
  }
} as const;

i18n.use(initReactI18next).init({
  lng: "en_US",
  fallbackLng: "en_US",
  ns: ["common"],
  defaultNS,
  resources,
});

i18n.use(initReactI18next).init({
  resources,
  lng: "en_US",
  fallbackLng: "en_US",
  interpolation: {
    escapeValue: false,
  },
});