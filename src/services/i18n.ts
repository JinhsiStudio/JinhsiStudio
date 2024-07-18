import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en_US from "@/locales/en_US.json"
import zh_CN from "@/locales/zh_CN.json";


const resources = {
  en_US: { translation: en_US},
  zh_CN: { translation: zh_CN },

};

i18n.use(initReactI18next).init({
  resources,
  lng: "zh_CN",
  fallbackLng: "en_US",
  interpolation: {
    escapeValue: false,
  },
});