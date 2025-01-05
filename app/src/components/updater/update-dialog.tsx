import { DialogRefWithProps } from "@/components/base/base-dialog";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import { Update } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import { Button } from "@/components/ui/base/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/base/dialog";
import { Typography } from "@/components/ui/base/typography";
import { List } from "@/components/ui/base/list";

export const UpdateDialog = forwardRef<DialogRefWithProps<Update>>(
  (_props, ref) => {
    const { t } = useTranslation();
    const [isOpen, setOpen] = useState<boolean>(false);
    const [downloadProgress, setDownloadProgress] = useState<number>(0);
    const [isDownloading, setIsDownloading] = useState<boolean>(false);
    const [update, setUpdate] = useState<Update | null>(null);

    useImperativeHandle(ref, () => ({
      open: (updateInfo: Update) => {
        setUpdate(updateInfo);
        setOpen(true);
      },
      close: () => {
        setOpen(false);
        setUpdate(null);
      },
    }));

    const handleOpenChange = (open: boolean) => {
      setOpen(open);
      if (!open) {
        setUpdate(null);
      }
    };

    const handleUpdate = async () => {
      if (!update) return;

      try {
        setIsDownloading(true);
        let downloaded = 0;
        let contentLength = 0;

        await update.downloadAndInstall((event) => {
          switch (event.event) {
            case "Started":
              contentLength = event.data.contentLength ?? 0;
              break;
            case "Progress":
              downloaded += event.data.chunkLength;
              setDownloadProgress(
                Math.round((downloaded / contentLength) * 100),
              );
              break;
            case "Finished":
              break;
          }
        });

        await relaunch();
      } catch (error) {
        console.error("Update failed:", error);
        setIsDownloading(false);
      }
    };

    // 如果没有更新信息，不渲染对话框
    if (!update) return null;

    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("common.Label-New-Version-Available")}</DialogTitle>
          </DialogHeader>

          <List>
            <List.Item>
              <div className="flex flex-col w-full gap-2">
                <Typography.Title level={5}>
                  {t("common.Label-Version")}
                </Typography.Title>
                <Typography.Text>{update.version}</Typography.Text>
              </div>
            </List.Item>
            <List.Item>
              <div className="flex flex-col w-full gap-2">
                <Typography.Title level={5}>
                  {t("common.Label-Release-Notes")}
                </Typography.Title>
                <Typography.Text>{update.body}</Typography.Text>
              </div>
            </List.Item>
            {isDownloading && (
              <List.Item>
                <div className="flex flex-col w-full gap-2">
                  <Typography.Title level={5}>
                    {t("common.Label-Downloading")}
                  </Typography.Title>
                  <Typography.Text>{downloadProgress}%</Typography.Text>
                </div>
              </List.Item>
            )}
          </List>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              {t("common.Label-Later")}
            </Button>
            <Button onClick={handleUpdate} disabled={isDownloading}>
              {isDownloading
                ? t("common.Label-Downloading")
                : t("common.Label-Install-Update")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);

UpdateDialog.displayName = "UpdateDialog";
