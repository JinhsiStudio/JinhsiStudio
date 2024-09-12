import { defineConfig } from "vitepress";
// import { search as zhCNSearch } from "./zh_cn";

// https://vitepress.dev/reference/site-config
export const shared = defineConfig({
  base: "/JinhsiStudio/",
  title: "JinhsiStudio",
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  //   sitemap: {
  //     hostname: "https://vitepress.dev",
  //     transformItems(items) {
  //       return items.filter((item) => !item.url.includes("migration"));
  //     },
  //   },

  head: [["link", { rel: "icon", href: "/jinhsi.webp" }]],
  themeConfig: {
    logo: { src: "/jinhsi.webp" },
    socialLinks: [
      { icon: "github", link: "https://github.com/JinhsiStudio/JinhsiStudio" },
    ],

    // search: {
    //   provider: "algolia",
    //   options: {
    //     appId: "622D3TCWD1",
    //     apiKey: "07f4c417d71b98866a552b6001ef4901",
    //     indexName: "vitepress",
    //     locales: {
    //       ...zhCNSearch,
    //     },
    //   },
    // },
  },
});
