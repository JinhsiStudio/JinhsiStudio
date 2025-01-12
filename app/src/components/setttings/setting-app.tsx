import { useTranslation } from "react-i18next";
import { SettingItem, SettingList } from "./mod/setting-component";
import { Button } from "@/components/ui/base/button";
import { defaultLanguage, supportedLanguages } from "@/services/i18n";
import { useAppSetting } from "@/hooks/storage/setting/use-app-setting";
import { useRef } from "react";
import { AppSetting, LanguageSetting } from "@/models/setting/app-setting";
import { SingleSelect } from "../ui/select";
import { ChevronRight } from "lucide-react";
import { check, Update } from "@tauri-apps/plugin-updater";
import { UpdateDialog } from "@/components/updater/update-dialog";
import { DialogRef, DialogRefWithProps } from "@/components/base/base-dialog";
import { useToast } from "@/hooks/use-toast";
import { version } from "@root/package.json";
import { Typography } from "../ui/base/typography";
import { ClearAppDataDialog } from "./mod/setting-clear-app-data";

export default function AppSettingList() {
  const { t, i18n } = useTranslation("setting");
  const { storedValue: appSetting, setValue: setAppSetting } = useAppSetting();
  const language = useRef(appSetting?.language || defaultLanguage);
  const updateDialogRef = useRef<DialogRefWithProps<Update>>(null);
  const clearAppSettingDialogRef = useRef<DialogRef>(null);
  const { toast } = useToast();

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
    } else {
      toast({
        title: t("common.Label-Current-Is-Latest"),
      });
    }
  };

  return (
    <div>
      <UpdateDialog ref={updateDialogRef} />
      <ClearAppDataDialog ref={clearAppSettingDialogRef} />
      <SettingList title={t("common.App-Settings")}>
        <SettingItem
          label={t("common.Language")}
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
          label={t("common.Label-Clear-App-Data")}
          extra={
            <Button
              variant="destructive"
              onClick={() => {
                clearAppSettingDialogRef.current?.open();
                //TODO show a confirming modal to double check
              }}
            >
              {t("common.Label-Clear-App-Data")}
            </Button>
          }
        />
        <SettingItem
          label={t("common.Label-Check-For-Updates")}
          onClick={handleCheckUpdate}
          extra={<ChevronRight />}
        />
        <SettingItem
          label={t("common.Label-Current-Version")}
          extra={<Typography.Text>{version}</Typography.Text>}
        />
      </SettingList>
    </div>
  );
}
