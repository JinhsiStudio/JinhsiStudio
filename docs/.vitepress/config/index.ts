import { defineConfig } from "vitepress";
import { zh_cn } from "./zh-cn";
import { en_us } from "./en-us";
import { shared } from "./shared";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "JinhsiStudio",
  description: "JinhsiStudio Doc",
  ...shared,
  locales: {
    en_us: {
      label: "English",
      link: "en-us",
      ...en_us,
    },
    zh_cn: { label: "简体中文", link: "zh-cn", ...zh_cn },
  },
});
