import { en_US_Traslations } from "@/locales";
import { defaultNS } from "./i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof en_US_Traslations;
  }
}
