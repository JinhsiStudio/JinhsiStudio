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
import { useNavigate } from "react-router-dom";

interface AppSidebarProps {
  key: string;
  label: string;
  icon: React.ExoticComponent;
  onClick?: (key: string) => void;
}

export function AppSidebar() {
  const navigate = useNavigate();
  // const [selectedKeys, setSelectedKeys] = useState(["Home"]);
  // const { storedValue: appSetting } = useAppSetting();
  const handleMenuClick = (_key: string, path: string) => {
    navigate(path);
  };
  const { t } = useTranslation();
  const homeItems: AppSidebarProps[] = [
    {
      key: "Home",
      label: t("Label-Home"),
      icon: Home,
      onClick: (key: string) => {
        handleMenuClick(key, "/");
      },
    },
  ];
  const toolItems: AppSidebarProps[] = [
    {
      key: "Gacha",
      label: t("Label-GachaTracker"),
      icon: ChartPie,
      onClick: (key: string) => {
        handleMenuClick(key, "/gacha");
      },
    },
  ];
  const dataItems: AppSidebarProps[] = [
    {
      key: "CharacterData",
      label: t("Label-Data-Character"),
      icon: Sword,
      onClick: (key: string) => {
        handleMenuClick(key, "/data/character");
      },
    },
  ];
  const profileItems: AppSidebarProps[] = [
    {
      key: "Setting",
      label: t("Label-Settings"),
      icon: Settings,
      onClick: (key: string) => {
        handleMenuClick(key, "/settings");
      },
    },
  ];

  function renderMenuItems(items: AppSidebarProps[]) {
    return (
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.key}>
            <SidebarMenuButton onClick={() => item.onClick?.(item.key)}>
              <item.icon />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    );
  }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("Label-Home")}</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(homeItems)}
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>{t("Label-Tools")}</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(toolItems)}
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>{t("Label-Data")}</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(dataItems)}
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>{t("Label-Profile")}</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(profileItems)}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
