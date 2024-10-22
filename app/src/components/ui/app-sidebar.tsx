import { ChartPie, Home, Settings, Sword } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";

interface AppSidebarProps {
  key: string;
  label: string;
  url: string;
  icon: React.ExoticComponent;
}

export function AppSidebar() {
  // const navigate = useNavigate();
  // const [selectedKeys, setSelectedKeys] = useState(["Home"]);
  // const { t, i18n } = useTranslation();
  // const { storedValue: appSetting } = useAppSetting();
  // const handleMenuClick = (key: string, path: string) => {
  //   setSelectedKeys([...selectedKeys, key]);
  //   navigate(path);
  // };
  const { t } = useTranslation();
  const homeItems: AppSidebarProps[] = [
    {
      key: "Home",
      label: t("Label-Home"),
      url: "/",
      icon: Home,
    },
  ];
  const toolItems: AppSidebarProps[] = [
    {
      key: "Gacha",
      label: t("Label-GachaTracker"),
      url: "/gacha",
      icon: ChartPie,
    },
  ];
  const dataItems: AppSidebarProps[] = [
    {
      key: "CharacterData",
      label: t("Label-Data-Character"),
      url: "/data/character",
      icon: Sword,
    },
  ];
  const profileItems: AppSidebarProps[] = [
    {
      key: "Setting",
      label: t("Label-Settings"),
      url: "/settings",
      icon: Settings,
    },
  ];
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("Label-Home")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {homeItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>{t("Label-Tools")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>{t("Label-Data")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dataItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>{t("Label-Profile")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {profileItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
