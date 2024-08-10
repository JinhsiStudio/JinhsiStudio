
import { DialogRef } from "@/components/base/base-dialog"
import { useLockFn } from "ahooks"
import { Input, List, message, Modal, Typography } from "antd"
import i18next from "i18next"
import { forwardRef, useImperativeHandle, useState } from "react"
export const GachaSettingModal = forwardRef<DialogRef>((_props, ref) => {
    const t = i18next.t;
    const [isOpen, setOpen] = useState<boolean>(false);
    useImperativeHandle(ref, () => ({
        open: () => setOpen(true),
        close: () => setOpen(false),
    }));
    const onSave = useLockFn(async () => {
        try {
            message.success(t("message:Message-Modify-Gacha-Url-Success"), 1)
            //TODO update local storage
            setOpen(false);
        } catch (err: any) {
            message.error(t("message:Message-Modify-Gacha-Url-Fail"), 3);
            console.error("Failed to update gacha url", err.toString())
        }
    });
    return <Modal title={t("Gacha-Settings")}
        open={isOpen}
        onOk={onSave}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        okText={t("Label-Save")}
        cancelText={t("Label-Cancel")}
    >
        <List>
            <List.Item>
                <div>
                    <Typography.Title level={5}>{t("Label-Gacha-Url")}</Typography.Title>
                    <Input
                        placeholder={t("Message-Please-Input-Gacha-Url")}
                    />
                </div>
            </List.Item>
        </List>
    </Modal>
})

// export default function GachaSettingModal(props: GachaSettingProps) {
//     const { t } = useTranslation()
//     const { isOpen } = props;
//     return <Modal title={t("Gacha-Settings")} open={isOpen}>
//         <List>
//             <List.Item>
//                 <div>
//                     <Typography.Title level={5}>{t("Label-Gacha-Url")}</Typography.Title>
//                     <Input
//                         placeholder={t("Message-Please-Input-Gacha-Url")}
//                     />
//                 </div>
//             </List.Item>
//         </List>
//     </Modal>

//     // return <SettingList title={t("Gacha-Settings")}>
//     //     <SettingItem label={t("Label-Gacha-Url")}>
//     //     </SettingItem>
//     //     <Input />
//     // </SettingList>
// }