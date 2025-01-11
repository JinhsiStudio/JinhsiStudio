#!/usr/bin/env node
import path from "path";
import fs from "fs";
import { glob } from "glob";

// Configuration
const LOCALES_DIR = path.join(process.cwd(), "src/locales");
const BASE_LOCALE = "en_US";

// Error messages
const ERRORS = {
  MISSING_LOCALE_DIR: (locale: string) => `Missing locale directory: ${locale}`,
  MISSING_FILE: (filePath: string) => `Missing translation file: ${filePath}`,
  EXTRA_FILE: (filePath: string) => `Extra translation file found: ${filePath}`,
  MISSING_KEY: (filePath: string, key: string) =>
    `Missing key in ${filePath}: ${key}`,
  EXTRA_KEY: (filePath: string, key: string) =>
    `Extra key in ${filePath}: ${key}`,
};

interface ValidationResult {
  errors: string[];
  warnings: string[];
}

async function main() {
  const result: ValidationResult = { errors: [], warnings: [] };

  try {
    // Get all locale directories
    const locales = fs
      .readdirSync(LOCALES_DIR, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    // Validate base locale exists
    if (!locales.includes(BASE_LOCALE)) {
      result.errors.push(`Base locale directory not found: ${BASE_LOCALE}`);
      return result;
    }

    // Get base locale structure
    const baseLocalePath = path.join(LOCALES_DIR, BASE_LOCALE);
    const baseFiles = await getLocaleFiles(baseLocalePath);

    // Validate other locales
    for (const locale of locales) {
      if (locale === BASE_LOCALE) continue;

      const localePath = path.join(LOCALES_DIR, locale);

      // Check if locale directory exists
      if (!fs.existsSync(localePath)) {
        result.errors.push(ERRORS.MISSING_LOCALE_DIR(locale));
        continue;
      }

      // Get locale files
      const localeFiles = await getLocaleFiles(localePath);

      // Validate file structure
      validateFileStructure(baseFiles, localeFiles, locale, result);

      // Validate translation keys
      await validateTranslationKeys(baseFiles, localeFiles, locale, result);
    }
  } catch (error) {
    result.errors.push(
      `Unexpected error: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  // Output results
  if (result.errors.length > 0) {
    console.error("Validation failed with errors:");
    result.errors.forEach((err) => console.error(`- ${err}`));
    process.exit(1);
  }

  if (result.warnings.length > 0) {
    console.warn("Validation completed with warnings:");
    result.warnings.forEach((warn) => console.warn(`- ${warn}`));
  }

  console.log("i18n validation completed successfully");
  process.exit(0);
}

async function getLocaleFiles(localePath: string): Promise<string[]> {
  const files = await glob("**/*.json", { cwd: localePath });
  return files.sort();
}

function validateFileStructure(
  baseFiles: string[],
  localeFiles: string[],
  locale: string,
  result: ValidationResult,
) {
  // Check for missing files
  baseFiles.forEach((baseFile) => {
    if (!localeFiles.includes(baseFile)) {
      result.errors.push(ERRORS.MISSING_FILE(path.join(locale, baseFile)));
    }
  });

  // Check for extra files
  localeFiles.forEach((localeFile) => {
    if (!baseFiles.includes(localeFile)) {
      result.warnings.push(ERRORS.EXTRA_FILE(path.join(locale, localeFile)));
    }
  });
}

async function validateTranslationKeys(
  baseFiles: string[],
  localeFiles: string[],
  locale: string,
  result: ValidationResult,
) {
  for (const file of baseFiles) {
    if (!localeFiles.includes(file)) continue;

    const baseFilePath = path.join(LOCALES_DIR, BASE_LOCALE, file);
    const localeFilePath = path.join(LOCALES_DIR, locale, file);

    const baseContent = JSON.parse(fs.readFileSync(baseFilePath, "utf-8"));
    const localeContent = JSON.parse(fs.readFileSync(localeFilePath, "utf-8"));

    // Check for missing keys
    Object.keys(baseContent).forEach((key) => {
      if (!(key in localeContent)) {
        result.errors.push(ERRORS.MISSING_KEY(path.join(locale, file), key));
      }
    });

    // Check for extra keys
    Object.keys(localeContent).forEach((key) => {
      if (!(key in baseContent)) {
        result.warnings.push(ERRORS.EXTRA_KEY(path.join(locale, file), key));
      }
    });
  }
}

main().catch((error) => {
  console.error("Unexpected error:", error);
  process.exit(1);
});
