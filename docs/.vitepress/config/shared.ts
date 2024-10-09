import { defineConfig } from "vitepress";
import { search as zhCNSearch } from "./zh_cn";

// https://vitepress.dev/reference/site-config
export const shared = defineConfig({
  base: "/JinhsiStudio/",
  title: "JinhsiStudio",
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  sitemap: {
    hostname: "https://jinhsistudio.github.io/JinhsiStudio/",
    transformItems(items) {
      return items.filter((item) => !item.url.includes("migration"));
    },
  },

  head: [["link", { rel: "icon", href: "/JinhsiStudio/jinhsi.webp" }]], //If base is set, use /base/path-to-ico then
  themeConfig: {
    logo: { src: "/jinhsi.ico" },
    socialLinks: [
      { icon: "github", link: "https://github.com/JinhsiStudio/JinhsiStudio" },
    ],

    search: {
      provider: "algolia",
      options: {
        appId: "6BH6Y4FOJ3",
        apiKey: "36f744549632fb05fa4df121dc3df986",
        indexName: "jinhsistudioio",
        locales: {
          ...zhCNSearch,
        },
      },
    },
  },
});
