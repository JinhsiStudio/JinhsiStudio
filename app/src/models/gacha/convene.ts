export enum Convene {
  EventCharacter = 1, //角色活动唤取 Featured Resonator Convene
  EventWeapon = 2, //武器活动唤取 Featured Weapon Convene
  PermanentCharacter = 3, // 角色常驻唤取 Standard Resonator Convene
  PermanentWeapon = 4, //武器常驻唤取 Standard Weapon Convene
  Beginner = 5, //新手唤取 Beginner Convene
  BeginnerSelected = 6, //新手自选唤取 Beginner's Choice Convene
  BeginnerGiveBackSelected = 7, //新手自选唤取(感恩回馈) Beginner's Choice Convene（Giveback Custom Convene)
}

export function getMaxGachaCount(convene: Convene) {
  switch (convene) {
    case Convene.Beginner || Convene.BeginnerSelected:
      return 50;
    case Convene.BeginnerGiveBackSelected:
      return 1;
    case Convene.EventCharacter ||
      Convene.EventWeapon ||
      Convene.PermanentCharacter ||
      Convene.PermanentWeapon:
      return 80;
    default:
      return 0;
  }
}

export function getConveneName(convene: Convene) {
  switch (convene) {
    case Convene.EventCharacter:
      return "角色活动";
    case Convene.EventWeapon:
      return "武器活动";
    case Convene.PermanentCharacter:
      return "角色常驻";
    case Convene.PermanentWeapon:
      return "武器常驻";
    case Convene.Beginner:
      return "新手";
    case Convene.BeginnerSelected:
      return "新手自选";
    case Convene.BeginnerGiveBackSelected:
      return "新手自选(感恩回馈)";
    default:
      return convene;
  }
}
