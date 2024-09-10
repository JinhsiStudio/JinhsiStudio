import { defineConfig } from "vitepress";

export const en_us = defineConfig({
  lang: "en-US",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/en-us" },
      { text: "Development Docs", link: "en-us/develop" },
    ],

    sidebar: [
      {
        text: "Development Docs",
        items: [
          { text: "Development Docs", link: "/en-us/develop" },
          { text: "TODO List", link: "/en-us/develop/TODO" },
        ],
      },
    ],
  },
});
