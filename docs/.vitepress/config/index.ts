import { defineConfig } from "vitepress";
import { zh_cn } from "./zh_cn";
import { en_us } from "./en_us";
import { shared } from "./shared";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...shared,
  locales: {
    en_us: {
      label: "English",
      ...en_us,
    },
    zh_cn: { label: "简体中文", ...zh_cn },
  },
});
