import { ChartPie, Home, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/base/sidebar";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface AppSidebarProps {
  key: string;
  label: string;
  icon: React.ExoticComponent;
  onClick?: (key: string) => void;
}

export function AppSidebar() {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("Home");
  const handleMenuClick = (key: string, path: string) => {
    setSelectedKey(key);
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
            <SidebarMenuButton
              isActive={selectedKey === item.key}
              onClick={() => item.onClick?.(item.key)}
            >
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
          <SidebarGroupLabel>{t("Label-Profile")}</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(profileItems)}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
