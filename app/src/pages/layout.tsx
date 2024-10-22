import { useEffect } from "react";
import AppRoutes from "./routers";
import { useAppSetting } from "@/hooks/storage/setting/use-app-setting";
import { useTranslation } from "react-i18next";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export const RootLayoutPage = () => {
  const { i18n } = useTranslation();
  const { storedValue: appSetting } = useAppSetting();
  useEffect(() => {
    console.log(appSetting);
    if (appSetting?.language) {
      console.log("setting language");
      i18n.changeLanguage(appSetting.language.identifier);
    }
  }, [appSetting]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger />
        <AppRoutes />
      </SidebarInset>
    </SidebarProvider>
  );
};
