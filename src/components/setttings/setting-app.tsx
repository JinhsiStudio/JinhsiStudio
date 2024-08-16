import { useTranslation } from "react-i18next";
import { SettingItem, SettingList } from "./mod/setting-component";
import { Select } from "antd";
import { defaultLanguage, supportedLanguages } from "@/services/i18n";
import { useAppSetting } from "@/hooks/storage/setting/use-app-setting";
import { useRef } from "react";
import { AppSetting, LanguageSetting } from "@/models/setting/app-setting";

export default function AppSettingList() {
  const { t, i18n } = useTranslation();
  const { storedValue: appSetting, setValue: setAppSetting } = useAppSetting();
  const language = useRef(appSetting?.language || defaultLanguage);
  // const [language, setLanguage] = useState(appSetting?.language || defaultLanguage)
  const handleChange = (
    value: string,
    option:
      | { value: string; label: string }
      | { value: string; label: string }[],
  ) => {
    i18n.changeLanguage(value);
    if (Array.isArray(option)) {
      language.current = new LanguageSetting(option[0].value, option[0].label);
    } else {
      language.current = new LanguageSetting(option.value, option.label);
    }
    setAppSetting(new AppSetting(language.current));
  };

  return (
    <SettingList title={t("App-Settings")}>
      <SettingItem label={t("Language")}>
        <Select
          defaultValue={i18n.language}
          style={{ width: 120 }}
          onChange={handleChange}
          options={supportedLanguages.map((data) => {
            return {
              value: data.identifier,
              label: data.label,
            };
          })}
        />
      </SettingItem>
    </SettingList>
  );
}
