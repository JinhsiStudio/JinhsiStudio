export const en_US_Traslations = {
  general: {
    common: await import("./en_US/general/common.json"),
    message: await import("./en_US/general/message.json"),
  },
  gacha: {
    common: await import("./en_US/gacha/common.json"),
    message: await import("./en_US/gacha/message.json"),
    resource: await import("./en_US/gacha/resource.json"),
  },
  setting: {
    common: await import("./en_US/setting/common.json"),
  },
} as const;

export const zh_CN_Traslations = {
  general: {
    common: await import("./zh_CN/general/common.json"),
    message: await import("./zh_CN/general/message.json"),
  },
  gacha: {
    common: import("./zh_CN/gacha/common.json"),
    message: import("./zh_CN/gacha/message.json"),
    resource: import("./zh_CN/gacha/resource.json"),
  },
  setting: {
    common: await import("./zh_CN/setting/common.json"),
  },
} as const;
