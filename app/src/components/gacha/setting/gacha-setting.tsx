import { DialogRef } from "@/components/base/base-dialog";
import { useGachaSetting } from "@/hooks/storage/gacha/use-gacha-setting";
import { GachaSetting } from "@/models/gacha/gacha-setting";
import { useLockFn } from "ahooks";
import { Button } from "@/components/ui/base/button";
import { Input } from "@/components/ui/base/input";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import { open } from "@tauri-apps/plugin-dialog";
import { FolderOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { List } from "@/components/ui/base/list";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/base/dialog";
import { Typography } from "@/components/ui/base/typography";

export const GachaSettingDialog = forwardRef<DialogRef>((_props, ref) => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState<boolean>(false);
  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
      setGachaUrl(gachaSetting?.url || "");
      setLogPath(gachaSetting?.logPath || "");
    },
    close: () => setOpen(false),
  }));
  const { storedValue: gachaSetting, setValue: setGachaSetting } =
    useGachaSetting();
  const [gachaUrl, setGachaUrl] = useState(gachaSetting?.url || "");
  const [logPath, setLogPath] = useState(gachaSetting?.logPath || "");
  const { toast } = useToast();

  const onSave = useLockFn(async () => {
    try {
      toast({
        title: t("Message-Modify-Gacha-Url-Success", { ns: "message" }),
      });
      await setGachaSetting(new GachaSetting(gachaUrl, logPath));
      setOpen(false);
    } catch (err: unknown) {
      toast({
        variant: "destructive",
        title: t("Message-Modify-Gacha-Url-Fail", { ns: "message" }),
      });
      console.error("Failed to update gacha url", (err as Error).message);
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Gacha-Settings")}</DialogTitle>
        </DialogHeader>

        <List>
          <List.Item>
            <div className="flex flex-col w-full gap-2">
              <Typography.Title level={5}>
                {t("Label-Gacha-Url")}
              </Typography.Title>
              <Input
                placeholder={t("Message-Please-Input-Gacha-Url")}
                value={gachaUrl}
                onChange={(e) => setGachaUrl(e.target.value)}
              />
            </div>
          </List.Item>
          <List.Item>
            <div className="flex flex-col w-full gap-2">
              <Typography.Title level={5}>
                {t("Label-Gacha-Log-Path")}
              </Typography.Title>
              <div className="flex w-full gap-2">
                <Input value={logPath} className="flex-1" />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={async () => {
                    const path = await open({
                      directory: false,
                      multiple: false,
                      filters: [
                        {
                          name: "Log File",
                          extensions: ["txt", "log"],
                        },
                      ],
                    });
                    if (path !== null) {
                      setLogPath(path);
                      console.log(path);
                    }
                  }}
                >
                  <FolderOpen />
                </Button>
              </div>
            </div>
          </List.Item>
        </List>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t("Label-Cancel")}
          </Button>
          <Button onClick={onSave}>{t("Label-Save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

GachaSettingDialog.displayName = "GachaSettingDialog";
