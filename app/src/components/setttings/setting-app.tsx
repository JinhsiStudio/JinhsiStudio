import { useTranslation } from "react-i18next";
import { SettingItem, SettingList } from "./mod/setting-component";
import { Button } from "@/components/ui/base/button";
import { defaultLanguage, supportedLanguages } from "@/services/i18n";
import { useAppSetting } from "@/hooks/storage/setting/use-app-setting";
import { useRef } from "react";
import { AppSetting, LanguageSetting } from "@/models/setting/app-setting";
import { getStorage, StorageNameSpace } from "@/hooks/storage/use-storage";
import { SingleSelect } from "../ui/select";
import { ChevronRight } from "lucide-react";
import { check, Update } from "@tauri-apps/plugin-updater";
import { UpdateDialog } from "@/components/updater/update-dialog";
import { DialogRefWithProps } from "@/components/base/base-dialog";

export default function AppSettingList() {
  const { t, i18n } = useTranslation();
  const { storedValue: appSetting, setValue: setAppSetting } = useAppSetting();
  const language = useRef(appSetting?.language || defaultLanguage);
  const updateDialogRef = useRef<DialogRefWithProps<Update>>(null);

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
    language.current = new LanguageSetting(
      value,
      supportedLanguages.find((lang) => lang.identifier === value)?.label || "",
    );
    setAppSetting(new AppSetting(language.current));
  };

  const handleCheckUpdate = async () => {
    const newUpdate = await check();
    if (newUpdate) {
      console.log(
        `found update ${newUpdate.version} from ${newUpdate.date} with notes ${newUpdate.body}`,
      );
      updateDialogRef.current?.open(newUpdate);
    }
  };

  return (
    <>
      <SettingList title={t("App-Settings")}>
        <SettingItem
          label={t("Language")}
          extra={
            <SingleSelect
              defaultValue={i18n.language}
              className="w-[120px]"
              onValueChange={handleChange}
              options={supportedLanguages.map((data) => ({
                value: data.identifier,
                label: data.label,
              }))}
            />
          }
        />
        <SettingItem
          label={t("Label-Clear-App-Data")}
          extra={
            <Button
              variant="destructive"
              onClick={async () => {
                //TODO show a confirming modal to double check
                const store = await getStorage(StorageNameSpace.APP_SETTING);
                await store.clear();
                await store.save();
              }}
            >
              {t("Label-Clear-App-Data")}
            </Button>
          }
        />
        <SettingItem
          label={t("Label-Check-For-Updates")}
          onClick={handleCheckUpdate}
          extra={<ChevronRight />}
        />
      </SettingList>
      <UpdateDialog
        ref={updateDialogRef}
        onOpenChange={(open) => {
          console.log("Dialog open state changed:", open);
        }}
      />
    </>
  );
}
