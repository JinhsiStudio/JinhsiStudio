import { useTranslation } from "react-i18next";

interface GachaStatisticPullTitleProp {
  pullCount: number;
}
export function GachaStatisticPullTitle(prop: GachaStatisticPullTitleProp) {
  const { t } = useTranslation("gacha");
  return (
    <div>
      <span className="text-6xl font-serif slashed-zero mx-4">
        {prop.pullCount}
      </span>
      <span className="text-xl">{t("common.Label-Pull")}</span>
    </div>
  );
}
