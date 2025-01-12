import { DialogRef } from "@/components/base/base-dialog";
import { Button } from "@/components/ui/base/button";
import { Checkbox } from "@/components/ui/base/checkbox";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/base/dialog";
import { List } from "@/components/ui/base/list";
import { getStorage, StorageNameSpace } from "@/hooks/storage/use-storage";
import { useSet } from "ahooks";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";

export const ClearAppDataDialog = forwardRef<DialogRef>((_props, ref) => {
  const { t } = useTranslation("setting");
  const [isOpen, setOpen] = useState<boolean>(false);
  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
    },
    close: () => setOpen(false),
  }));
  const [
    storageToBeCleared,
    {
      add: addStorageToBeCleared,
      remove: removeStorageToBeCleared,
      reset: resetStorageToBeCleared,
    },
  ] = useSet<StorageNameSpace>();

  async function onClear() {
    storageToBeCleared.forEach(async (value) => {
      const store = await getStorage(value);
      await store.clear();
      await store.save();
    });
    resetStorageToBeCleared();
  }

  function getAppDataStorageListItem(
    namespace: StorageNameSpace,
    title: string,
    subtitle: string,
  ) {
    return (
      <List.Item>
        <div className="items-top flex space-x-2">
          <Checkbox
            id="app-data"
            onCheckedChange={(checked) => {
              if (checked) {
                addStorageToBeCleared(namespace);
              } else {
                removeStorageToBeCleared(namespace);
              }
            }}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="app-data"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {title}
            </label>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
      </List.Item>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("common.Label-Clear-App-Data")}</DialogTitle>
        </DialogHeader>
        {/* "Label-App-Data-App-Setting": "App Setting Cache",
  "Label-App-Data-Gacha-Setting": "Gacha Setting Cache",
  "Label-App-Data-Gacha-Archive": "Gacha Data Cache",
  "Label-App-Data-Desc-App-Setting": "App settings, including language preference etc.",
  "Label-App-Data-Desc-Gacha-Setting": "Gacha settings, including gacha log path etc.",
  "Label-App-Data-Desc-Gacha-Archive": "Gacha data, including all stored gacha records etc." */}
        <List>
          {getAppDataStorageListItem(
            StorageNameSpace.APP_SETTING,
            t("common.Label-App-Data-App-Setting"),
            t("common.Label-App-Data-Desc-App-Setting"),
          )}
          {getAppDataStorageListItem(
            StorageNameSpace.GACHA_ARCHIVE,
            t("common.Label-App-Data-Gacha-Archive"),
            t("common.Label-App-Data-Desc-Gacha-Archive"),
          )}
          {getAppDataStorageListItem(
            StorageNameSpace.GACHA_SETTING,
            t("common.Label-App-Data-Gacha-Setting"),
            t("common.Label-App-Data-Desc-Gacha-Setting"),
          )}
        </List>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t("common.Label-Cancel", { ns: "general" })}
          </Button>
          <Button variant="destructive" onClick={onClear}>
            {t("common.Label-Clear-App-Data")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

ClearAppDataDialog.displayName = "ClearAppDataDialog";
