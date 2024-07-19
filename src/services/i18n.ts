import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en_US from "@/locales/en_US.json"
import zh_CN from "@/locales/zh_CN.json";

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



const resources = {
  en_US: { translation: en_US},
  zh_CN: { translation: zh_CN },

};

i18n.use(initReactI18next).init({
  resources,
  lng: "en_US",
  fallbackLng: "en_US",
  interpolation: {
    escapeValue: false,
  },
});