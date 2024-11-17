import { useTranslation } from "react-i18next";
import { SettingItem, SettingList } from "./mod/setting-component";
import { Button } from "@/components/ui/base/button";
import { defaultLanguage, supportedLanguages } from "@/services/i18n";
import { useAppSetting } from "@/hooks/storage/setting/use-app-setting";
import { useRef } from "react";
import { AppSetting, LanguageSetting } from "@/models/setting/app-setting";
import { getStorage } from "@/hooks/storage/use-storage";
import { SingleSelect } from "../ui/select";

export default function AppSettingList() {
  const { t, i18n } = useTranslation();
  const { storedValue: appSetting, setValue: setAppSetting } = useAppSetting();
  const language = useRef(appSetting?.language || defaultLanguage);
  // const [language, setLanguage] = useState(appSetting?.language || defaultLanguage)
  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
    language.current = new LanguageSetting(
      value,
      supportedLanguages.find((lang) => lang.identifier === value)?.label || "",
    );
    setAppSetting(new AppSetting(language.current));
  };

  return (
    <SettingList title={t("App-Settings")}>
      <SettingItem label={t("Language")}>
        <SingleSelect
          defaultValue={i18n.language}
          className="w-[120]"
          onValueChange={handleChange}
          options={supportedLanguages.map((data) => {
            return {
              value: data.identifier,
              label: data.label,
            };
          })}
        />
      </SettingItem>
      <SettingItem label={t("Label-Clear-App-Data")}>
        <Button
          variant="destructive"
          onClick={async () => {
            //TODO show a confirming modal to double check
            const store = await getStorage();
            await store.clear();
            await store.save();
          }}
        >
          {t("Label-Clear-App-Data")}
        </Button>
      </SettingItem>
    </SettingList>
  );
}
