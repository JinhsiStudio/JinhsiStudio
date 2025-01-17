import { useEffect, useRef } from "react";
import { useRequest } from "ahooks";
import { Spinner } from "@/components/ui/base/spinner";
import {
  FloatButton,
  FloatButtonGroup,
} from "@/components/ui/base/float-button";
import {
  //   getGachaLogFromLocal,
  //   getGachaLogFromUrl,
  updateGachaLogFromLocal,
  updateGachaLogFromUrl,
} from "@/services/invokes/gacha";
import GachaCard from "@/components/gacha/gacha-card";
import { GachaLog, getDummyGachaData } from "@/models/gacha/gacha-log";
import { MoreHorizontal, RefreshCw, Settings } from "lucide-react";
import { GachaSettingDialog } from "@/components/gacha/setting/gacha-setting";
import { DialogRef } from "@/components/base/base-dialog";
import { useTranslation } from "react-i18next";
import { useGachaSetting } from "@/hooks/storage/gacha/use-gacha-setting";
import { useGachaArchive } from "@/hooks/storage/gacha/use-gacha-archive";
import {
  GachaLogArchive,
  IGachaLogArchive,
} from "@/models/gacha/dao/gacha-archive";
import { GachaLogDao } from "@/models/gacha/dao/gacha-log-dao";
import { useToast } from "@/hooks/use-toast";

const DEAFULT_UID = 0; //TODO remove it

const updater = async (
  url: string | void,
  logPath: string | void,
  gachaArchive: IGachaLogArchive | void,
): Promise<void | GachaLogDao[]> => {
  if ((!url && !logPath) || !gachaArchive) {
    return Promise.reject("data required by udpater are not ready");
  }
  if (url && logPath) {
    return Promise.any([
      updateGachaLogFromUrl(gachaArchive.logs, url),
      updateGachaLogFromLocal(gachaArchive.logs, logPath),
    ]);
  } else if (url) {
    return updateGachaLogFromUrl(gachaArchive.logs, url);
  } else if (logPath) {
    return updateGachaLogFromLocal(gachaArchive.logs, logPath);
  }
};
export default function GachaPage() {
  const { t } = useTranslation("gacha");
  const { storedValue: gachaSetting } = useGachaSetting();
  const { storedValue: gachaArchive, setValue: setGachaArchive } =
    useGachaArchive(DEAFULT_UID);
  const settingRef = useRef<DialogRef>(null);
  const { toast } = useToast();

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
    if (gachaSetting?.logPath || gachaSetting?.url) {
      run();
    } else {
      toast({
        variant: "destructive",
        title: t("message.Message-Please-Input-Valid-Gacha-Url-Or-Log-Path"),
      });
    }
  };

  const throwErrorMessge = (error: Error) => {
    console.error("Failed to fetch gacha data with error: ", error);
    toast({
      variant: "destructive",
      title: t("message.Message-Failed-To-Load-Gacha-Data"),
    });
  };

  useEffect(() => {
    if (gachaSetting && !gachaSetting.logPath && !gachaSetting.url) {
      toast({
        title: t("message.Message-No-Url-Or-Path-Please-Set-First"),
      });
      settingRef.current?.open();
    }
  }, [gachaSetting, gachaSetting?.logPath, gachaSetting?.url]);

  return (
    <div>
      <GachaSettingDialog ref={settingRef}></GachaSettingDialog>
      <Spinner spinning={loading} fullscreen size="large" />
      <GachaCard
        data={
          gachaArchive?.logs.map((log) => GachaLog.fromDao(log)) ||
          getDummyGachaData()
        }
      />
      <FloatButtonGroup icon={<MoreHorizontal />}>
        <FloatButton
          icon={<RefreshCw />}
          onClick={handleFetchData}
          tooltip={t("common.Label-Fetch-Data")}
        />
        <FloatButton
          icon={<Settings />}
          onClick={() => settingRef.current?.open()}
          tooltip={t("common.Label-Gacha-Setting")}
        />
      </FloatButtonGroup>
    </div>
  );
}
