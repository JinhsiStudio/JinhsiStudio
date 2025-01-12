// Permanent Chracters
import lingyang from "@/assets/resonators/lingyang.webp";
import verina from "@/assets/resonators/verina.webp";
import encore from "@/assets/resonators/encore.webp";
// Featured Characters
import carlotta from "@/assets/resonators/carlotta.png";
import jinhsi from "@/assets/resonators/jinhsi.webp";
import changli from "@/assets/resonators/changli.webp";
import shorekeeper from "@/assets/resonators/shorekeeper.webp";
import camellya from "@/assets/resonators/camellya.webp";
//Permanent Weapons
import emeraldOfGenesis from "@/assets/weapons/emerald-of-genesis.webp";
//Featured Weapons
import agesOfHarvest from "@/assets/weapons/ages-of-harvest.webp";
import redSpring from "@/assets/weapons/red-spring.webp";
import stellarSymphony from "@/assets/weapons/stellar-symphony.webp";
import theLastDance from "@/assets/weapons/the-last-dance.webp";
import { useTranslation } from "react-i18next";

//TODO fill this enum
enum Character {
  //  Permanent Character
  LingYang = 1104,
  Verina = 1503,
  Encore = 1203,
  //  Featured Character
  Carlotta = 1107,
  Changli = 1205,
  Jinhsi = 1304,
  Shorekeeper = 1505,
  Camellya = 1603,
}

enum Weapon {
  //  Permanent Weapon
  EmeraldOfGenesis = 21020015,
  //  Featured Weapon
  AgesOfHarvest = 21010026,
  RedSpring = 21020026,
  TheLastDance = 21030016,
  StellarSymphony = 21050036,
}

/**
 * Should be used in React Component
 */
export function matchResource(name: string, resourceId: number): string | null {
  const { t } = useTranslation("gacha");
  //TODO match resource with resourceId instead of name
  switch (resourceId) {
    case Character.LingYang:
      return lingyang;
    case Character.Verina:
      return verina;
    case Character.Encore:
      return encore;
    // Featured Character
    case Character.Carlotta:
      return carlotta;
    case Character.Changli:
      return changli;
    case Character.Jinhsi:
      return jinhsi;
    case Character.Shorekeeper:
      return shorekeeper;
    case Character.Camellya:
      return camellya;
  }
  switch (resourceId) {
    case Weapon.EmeraldOfGenesis:
      return emeraldOfGenesis;
    case Weapon.AgesOfHarvest:
      return agesOfHarvest;
    case Weapon.RedSpring:
      return redSpring;
    case Weapon.StellarSymphony:
      return stellarSymphony;
    case Weapon.TheLastDance:
      return theLastDance;
  }
  switch (name) {
    case t("resource.Character.Changli"):
      return changli;
    case t("resource.Character.Jinhsi"):
      return jinhsi;
    default:
      console.error("Unmatched resource: ", name, "with id: ", resourceId);
      return null;
  }
}
