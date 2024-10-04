interface GachaStatisticPullTitleProp {
  pullCount: number;
}
export function GachaStatisticPullTitle(prop: GachaStatisticPullTitleProp) {
  return (
    <div>
      <span className="text-6xl font-serif slashed-zero mx-4">
        {prop.pullCount}
      </span>
      <span className="text-xl">{"抽"}</span>
    </div>
  );
}
