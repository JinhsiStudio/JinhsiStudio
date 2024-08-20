import lingyang from "@/assets/resonators/lingyang.webp";
import verina from "@/assets/resonators/verina.webp";
import jinhsi from "@/assets/resonators/jinhsi.webp";
import changli from "@/assets/resonators/changli.webp";
import emerald_of_genesis from "@/assets/weapons/emerald_of_genesis.webp";
import ages_of_harvest from "@/assets/weapons/ages_of_harvest.webp";
import { useTranslation } from "react-i18next";

enum Character {
  //  Permanent Character
  LingYang = 1104,
  Verina = 1503,
  //  Featured Character
  Jinhsi = 1304,
  Changli = 1205,
}

enum Weapon {
  //  Permanent Weapon
  EmeraldOfGenesis = 21010026,
  //  Featured Weapon
  AgesOfHarvest = 21020015,
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
  }
  switch (resourceId) {
    case Weapon.AgesOfHarvest:
      return ages_of_harvest;
    case Weapon.EmeraldOfGenesis:
      return emerald_of_genesis;
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
