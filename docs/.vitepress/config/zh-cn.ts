import { defineConfig } from "vitepress";

export const zh_cn = defineConfig({
  lang: "zh-CN",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/zh-cn" },
      { text: "Development Docs", link: "/zh-cn/develop" },
    ],

    sidebar: [
      {
        text: "Development Docs",
        items: [
          { text: "Development Docs", link: "/zh-cn/develop" },
          { text: "TODO List", link: "/zh-cn/develop/TODO" },
        ],
      },
    ],
  },
});
