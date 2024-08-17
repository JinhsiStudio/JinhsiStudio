import { DialogRef } from "@/components/base/base-dialog";
import { useGachaSetting } from "@/hooks/storage/gacha/use-gacha-setting";
import { GachaSetting } from "@/models/gacha/gacha-setting";
import { useLockFn } from "ahooks";
import { Button, Input, List, message, Modal, Space, Typography } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import { open } from "@tauri-apps/plugin-dialog";
import { FolderOpenOutlined } from "@ant-design/icons";

export const GachaSettingModal = forwardRef<DialogRef>((_props, ref) => {
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
  const onSave = useLockFn(async () => {
    try {
      message.success(
        t("Message-Modify-Gacha-Url-Success", { ns: "message" }),
        1,
      );
      await setGachaSetting(new GachaSetting(gachaUrl, logPath));
      setOpen(false);
    } catch (err: unknown) {
      message.error(t("Message-Modify-Gacha-Url-Fail", { ns: "message" }), 3);
      console.error("Failed to update gacha url", (err as Error).message);
    }
  });
  return (
    <Modal
      title={t("Gacha-Settings")}
      open={isOpen}
      onOk={onSave}
      onClose={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      okText={t("Label-Save")}
      cancelText={t("Label-Cancel")}
    >
      <List>
        <List.Item>
          <div style={{ width: "100%" }}>
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
          <Space direction="vertical" style={{ width: "100%" }}>
            <Typography.Title level={5}>
              {t("Label-Gacha-Log-Path")}
            </Typography.Title>
            <Space.Compact direction="horizontal" style={{ width: "100%" }}>
              <Input variant="outlined" value={logPath} />
              <Button
                icon={<FolderOpenOutlined />}
                onClick={async () => {
                  const selected = await open({
                    directory: false,
                    multiple: false,
                    filters: [
                      {
                        name: "Log File",
                        extensions: ["txt", "log"],
                      },
                    ],
                  });
                  if (selected !== null) {
                    setLogPath(selected.path);
                    console.log(selected.path);
                  }
                }}
              ></Button>
            </Space.Compact>
          </Space>
        </List.Item>
      </List>
    </Modal>
  );
});

GachaSettingModal.displayName = "GachaSettingModal";
