import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import GachaCard from "./gacha-card";
import { GachaLog } from "@/models/gacha/gacha-log";
import { Character, Weapon } from "./gacha-resource";
import dayjs from "dayjs";
import { Convene } from "@/models/gacha/convene";
import { GachaItem } from "@/models/gacha/gacha-item";

// Mock translation hook
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockDummyGachaItem = new GachaItem(0, 4, "DummyItem", dayjs());

// Mock data
const mockCharacterItems: GachaItem[] = [
  new GachaItem(Character.Camellya, 5, "Item1", dayjs()),
  mockDummyGachaItem,
  mockDummyGachaItem,
  new GachaItem(Character.Changli, 5, "Item2", dayjs()),
  mockDummyGachaItem,
  mockDummyGachaItem,
  new GachaItem(Character.Encore, 5, "Item3", dayjs()),
  mockDummyGachaItem,
  mockDummyGachaItem,
  new GachaItem(Character.Jinhsi, 5, "Item4", dayjs()),
];

// const mockCharacterData: GachaLog[] = [
//   new GachaLog(Convene.EventCharacter, mockCharacterItems),
// ];

const mockWeaponItems: GachaItem[] = [
  new GachaItem(Weapon.AgesOfHarvest, 5, "Item1", dayjs()),
  new GachaItem(Weapon.EmeraldOfGenesis, 5, "Item2", dayjs()),
  mockDummyGachaItem,
  mockDummyGachaItem,
  new GachaItem(Weapon.RedSpring, 5, "Item3", dayjs()),
  mockDummyGachaItem,
  mockDummyGachaItem,
  new GachaItem(Weapon.StellarSymphony, 5, "Item4", dayjs()),
];

const mockWeaponData: GachaLog[] = [
  new GachaLog(Convene.EventWeapon, mockWeaponItems),
];

const mockMergedData: GachaLog[] = [
  new GachaLog(Convene.EventWeapon, mockWeaponItems),
  new GachaLog(Convene.EventCharacter, mockCharacterItems),
];

// generateTest("EventCharacter", mockCharacterData);
generateTest("EventWeapon", mockWeaponData);
generateTest("Merged Data", mockMergedData);

function generateTest(testName: string, mockData: GachaLog[]) {
  describe("GachaCard Component Test: " + testName, () => {
    // Test basic rendering
    it("renders card with title and content", () => {
      render(<GachaCard data={mockData} />);

      // Check title
      //   expect(screen.getByText("common.Label")).toBeInTheDocument();

      // Check pull count
      expect(screen.getByText("common.Label-Pull")).toBeInTheDocument();
      expect(screen.getByRole("gacha-pull-count")).toBeInTheDocument();
      expect(screen.getByRole("gacha-pull-count")).toHaveTextContent(
        mockData[0].items.length.toString(),
      );
    });

    // Test statistics calculation
    it("calculates and displays correct statistics", () => {
      render(<GachaCard data={mockData} />);

      // Check 5-star stats
      expect(
        screen.getByRole("gacha-last-five-star-count"),
      ).toBeInTheDocument(); // Last 5-star
      expect(screen.getByRole("gacha-last-five-star-count")).toHaveTextContent(
        "0",
      ); // Last 5-star
      expect(
        screen.getByRole("gacha-average-five-star-count"),
      ).toBeInTheDocument(); // Avg 5-star
      expect(
        screen.getByRole("gacha-average-five-star-count"),
      ).toHaveTextContent("2"); // Avg 5-star

      // Check 4-star stats
      expect(
        screen.getByRole("gacha-last-four-star-count"),
      ).toBeInTheDocument(); // Last 4-star
      expect(screen.getByRole("gacha-last-four-star-count")).toHaveTextContent(
        "2",
      ); // Last 4-star
      expect(
        screen.getByRole("gacha-average-five-star-count"),
      ).toBeInTheDocument(); // Avg 4-star
      expect(
        screen.getByRole("gacha-average-five-star-count"),
      ).toHaveTextContent("2"); // Avg 4-star
    });

    // Test avatar rendering
    it("renders correct number of avatar cards", () => {
      render(<GachaCard data={mockData} />);

      const avatars = screen.getAllByRole("gacha-avatar-container");
      expect(avatars.length).toBe(4); // Only 5-star items should show
    });

    // Test dropdown selection
    it("changes displayed data when dropdown changes", async () => {
      render(<GachaCard data={mockData} />);

      // TODO: Add dropdown interaction test
      // This will require mocking the SingleSelect component
    });
  });
}
