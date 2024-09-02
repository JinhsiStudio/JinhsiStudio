import { useRef } from "react";
import { useRequest } from "ahooks";
import { Button, message, Spin, Space, Flex } from "antd";
import {
  //   getGachaLogFromLocal,
  //   getGachaLogFromUrl,
  updateGachaLogFromLocal,
  updateGachaLogFromUrl,
} from "@/services/invokes/gacha";
import GachaCard from "@/components/gacha/gacha-card";
import { GachaLog } from "@/models/gacha/gacha-log";
import { LoadingOutlined } from "@ant-design/icons";
import { GachaSettingModal } from "@/components/gacha/setting/gacha-setting";
import { DialogRef } from "@/components/base/base-dialog";
import { useTranslation } from "react-i18next";
import { useGachaSetting } from "@/hooks/storage/gacha/use-gacha-setting";
import { useGachaArchive } from "@/hooks/storage/gacha/use-gacha-archive";
import {
  GachaLogArchive,
  IGachaLogArchive,
} from "@/models/gacha/dao/gacha-archive";
import { GachaLogDao } from "@/models/gacha/dao/gacha-log-dao";

const DEAFULT_UID = 0; //TODO remove it

// const fetcher = async (
//   url: string,
//   logPath: string,
// ): Promise<void | GachaLog[]> =>
//   Promise.any([getGachaLogFromUrl(url), getGachaLogFromLocal(logPath)]);

const updater = async (
  url: string | void,
  logPath: string | void,
  gachaArchive: IGachaLogArchive | void,
): Promise<void | GachaLogDao[]> => {
  if (!url || !logPath || !gachaArchive) {
    return Promise.reject("data required by udpater are not ready");
  }

  return Promise.any([
    updateGachaLogFromUrl(gachaArchive.logs, url),
    updateGachaLogFromLocal(gachaArchive.logs, logPath),
  ]);
};
export default function GachaPage() {
  const { t } = useTranslation();
  const { storedValue: gachaSetting } = useGachaSetting();
  const { storedValue: gachaArchive, setValue: setGachaArchive } =
    useGachaArchive(DEAFULT_UID);
  const settingRef = useRef<DialogRef>(null);

  const { loading, run } = useRequest(
    () => updater(gachaSetting?.url, gachaSetting?.logPath, gachaArchive),
    {
      manual: true,
      refreshOnWindowFocus: false,
      onError: (e) => throwErrorMessge(e),
      onSuccess: (data) => {
        if (data) setGachaArchive(new GachaLogArchive(gachaArchive!.uid, data));
      },
    },
  );

  const handleFetchData = () => {
    if (gachaSetting?.logPath) {
      run();
    } else {
      message.warning(t("Message-Please-Input-Valid-Gacha-Url"));
    }
  };

  //   const filterDataByConvene = (conveneTypes: number[]) => {
  //     return (
  //       gachaArchive?.logs
  //         .map((log) => GachaLog.fromDao(log))
  //         .filter((log) => conveneTypes.includes(log.convene)) || []
  //     );
  //   };

  const throwErrorMessge = (error: Error) => {
    console.error("Failed to fetch gacha data with error: ", error);
    message.error(t("Message-Failed-To-Load-Gacha-Data", { ns: "message" }));
  };

  const tabBarButtonWithSetting = (
    <Space>
      <Button type="primary" onClick={handleFetchData}>
        {t("Label-Fetch-Data")}
      </Button>
      <Button type="primary" onClick={() => settingRef.current?.open()}>
        {t("Label-Gacha-Setting")}
      </Button>
    </Space>
  );

  return (
    <Flex vertical={true}>
      <GachaSettingModal ref={settingRef}></GachaSettingModal>
      <Spin spinning={loading} size="large" indicator={<LoadingOutlined />}>
        <GachaCard
          data={gachaArchive?.logs.map((log) => GachaLog.fromDao(log)) || []}
        ></GachaCard>
      </Spin>
    </Flex>
  );
}
