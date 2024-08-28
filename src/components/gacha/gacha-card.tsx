import { Convene } from "@/models/gacha/convene";
import { GachaItem } from "@/models/gacha/gacha-item";
import { GachaLog } from "@/models/gacha/gacha-log";
import { Card, Tabs, Statistic, TabsProps } from "antd";
import GachaAvatarCard from "./gacha-avatar-card";
import "./gacha-card.css";

interface GachaCardProps {
  data: GachaLog;
}

function calculateDistance(items: GachaItem[], rarity: number): number[] {
  const distances: number[] = [];
  let lastIndex = -1;
  for (let i = 0; i < items.length; i++) {
    if (items[i].rarity === rarity) {
      if (lastIndex !== -1) {
        distances.push(i - lastIndex);
      }
      lastIndex = i;
    }
  }
  if (lastIndex !== -1) {
    distances.push(items.length - lastIndex);
  }
  return distances;
}

function sum(arr: number[]): number {
  if (arr.length !== 0) {
    return arr.reduce((prev, cur) => prev + cur);
  } else {
    return 0;
  }
}

const getConveneName = (convene: Convene) => {
  switch (convene) {
    case Convene.EventCharacter:
      return "角色活动";
    case Convene.EventWeapon:
      return "武器活动";
    case Convene.PermanentCharacter:
      return "角色常驻";
    case Convene.PermanentWeapon:
      return "武器常驻";
    case Convene.Beginner:
      return "新手";
    case Convene.BeginnerSelected:
      return "新手自选";
    case Convene.BeginnerGiveBackSelected:
      return "新手自选(感恩回馈)";
    default:
      return convene;
  }
};

export default function GachaCard(props: GachaCardProps) {
  const { convene, items } = props.data;

  const fiveStarDistances = calculateDistance(items, 5);
  const fourStarDistances = calculateDistance(items, 4);

  const lastFiveStar = items.length - sum(fiveStarDistances);
  const lastFourStar = items.length - sum(fourStarDistances);

  const fiveStarItems = items.filter((item) => item.rarity === 5);
  //   const fourStarItems = items.filter((item) => item.rarity === 4);

  const averageFiveStar = fiveStarDistances.length
    ? (sum(fiveStarDistances) / fiveStarDistances.length).toFixed(2)
    : "N/A";
  const averageFourStar = fourStarDistances.length
    ? (sum(fourStarDistances) / fourStarDistances.length).toFixed(2)
    : "N/A";

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "统计",
      children: (
        <div style={{ maxHeight: "80%", overflowY: "auto" }}>
          <Statistic title="五星平均抽数" value={averageFiveStar} />
          <Statistic title="四星平均抽数" value={averageFourStar} />
          <div className="gacha-avatar-container">
            {fiveStarItems.map((item, index) => (
              <GachaAvatarCard
                key={index}
                number={fiveStarDistances[index]}
                name={item.name}
                resourceId={item.id}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "比例",
      children: (
        <div style={{ maxHeight: "80%", overflowY: "auto" }}>
          {/* 比例内容 */}
        </div>
      ),
    },
    {
      key: "3",
      label: "预测",
      children: (
        <div style={{ maxHeight: "80%", overflowY: "auto" }}>
          {/* 预测内容 */}
        </div>
      ),
    },
  ];

  return (
    <Card title={getConveneName(convene)}>
      <Statistic title="总抽数" value={items.length} />
      <Statistic title="距离上个五星" value={lastFiveStar} />
      <Statistic title="距离上个四星" value={lastFourStar} />
      <Tabs items={tabItems} defaultActiveKey="1"></Tabs>
    </Card>
  );
}
