import lingyang from "@/assets/resonators/lingyang.webp";
import verina from "@/assets/resonators/verina.webp";
import jinhsi from "@/assets/resonators/jinhsi.webp";
import changli from "@/assets/resonators/changli.webp";
import shorekeeper from "@/assets/resonators/shorekeeper.webp";
//Weapons
import emeraldOfGenesis from "@/assets/weapons/emerald-of-genesis.webp";
import agesOfHarvest from "@/assets/weapons/ages-of-harvest.webp";
import stellarSymphony from "@/assets/weapons/stellar-symphony.webp";
import { useTranslation } from "react-i18next";

enum Character {
  //  Permanent Character
  LingYang = 1104,
  Verina = 1503,
  //  Featured Character
  Jinhsi = 1304,
  Changli = 1205,
  Shorekeeper = 1505,
}

enum Weapon {
  //  Permanent Weapon
  EmeraldOfGenesis = 21010026,
  //  Featured Weapon
  AgesOfHarvest = 21020015,
  StellarSymphony = 21050036,
}

/**
 * Should be used in React Component
 */
export function matchResource(name: string, resourceId: number): string | null {
  const { t } = useTranslation("resource");
  //TODO match resource with resourceId instead of name
  switch (resourceId) {
    case Character.LingYang:
      return lingyang;
    case Character.Verina:
      return verina;
    case Character.Changli:
      return changli;
    case Character.Jinhsi:
      return jinhsi;
    case Character.Shorekeeper:
      return shorekeeper;
  }
  switch (resourceId) {
    case Weapon.AgesOfHarvest:
      return agesOfHarvest;
    case Weapon.EmeraldOfGenesis:
      return emeraldOfGenesis;
    case Weapon.StellarSymphony:
      return stellarSymphony;
  }
  switch (name) {
    case t("Character.Changli"):
      return changli;
    case t("Character.Jinhsi"):
      return jinhsi;
    default:
      console.error("Unmatched resource: ", name, "with id: ", resourceId);
      return null;
  }
}
