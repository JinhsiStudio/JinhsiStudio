import { DefaultTheme, defineConfig } from "vitepress";

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: "Home", link: "/en_us" },
    { text: "Development Docs", link: "/en_us/develop/development" },
  ];
}

function sidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Development Docs",
      items: [
        { text: "Development Docs", link: "/en_us/develop/development" },
        { text: "TODO List", link: "/en_us/develop/TODO" },
      ],
    },
  ];
}

export const en_us = defineConfig({
  lang: "en_US",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),
    sidebar: sidebar(),

    editLink: {
      pattern:
        "https://github.com/JinhsiStudio/JinhsiStudio/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },

    footer: {
      message: "Released under the LGPL-2.1 License.",
      copyright: "Copyright © 2019-present Chiichen",
    },
  },
});
