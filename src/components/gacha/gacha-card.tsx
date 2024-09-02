import { Convene } from "@/models/gacha/convene";
import { GachaItem } from "@/models/gacha/gacha-item";
import { GachaLog } from "@/models/gacha/gacha-log";
import { Card, Tabs, Statistic, TabsProps, Select, Empty, Flex } from "antd";
import GachaAvatarCard from "./gacha-avatar-card";
import "./gacha-card.css";
import { useState } from "react";
interface GachaCardProps {
  data: GachaLog[];
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
  if (props.data.length === 0) {
    return <Empty></Empty>;
  } else {
    const [currentGacha, setCurrentGacha] = useState(props.data[0]);

    const fiveStarDistances = calculateDistance(currentGacha.items, 5);
    const fourStarDistances = calculateDistance(currentGacha.items, 4);

    const lastFiveStar = currentGacha.items.length - sum(fiveStarDistances);
    const lastFourStar = currentGacha.items.length - sum(fourStarDistances);

    const fiveStarItems = currentGacha.items.filter(
      (item) => item.rarity === 5,
    );
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
          <Flex vertical={true}>
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
          </Flex>
        ),
        style: { overflowY: "auto" },
      },
      {
        key: "2",
        label: "比例",
        children: <div>{/* 比例内容 */}</div>,
        style: { overflowY: "auto" },
      },
      {
        key: "3",
        label: "预测",
        children: <div>{/* 预测内容 */}</div>,
        style: { overflowY: "auto" },
      },
    ];

    const titleItems = props.data.map((value: GachaLog, index: number) => {
      return {
        value: index,
        label: getConveneName(value.convene),
      };
    });
    return (
      <Card
        title={getConveneName(currentGacha.convene)}
        extra={
          <Select
            options={titleItems}
            onChange={(value) => setCurrentGacha(props.data[value])}
            defaultValue={0}
          ></Select>
        }
        // style={{ height: "100vh" }}
        // styles={{ body: { height: "100%" } }}
      >
        <Flex vertical={true}>
          <Statistic title="总抽数" value={currentGacha.items.length} />
          <Statistic title="距离上个五星" value={lastFiveStar} />
          <Statistic title="距离上个四星" value={lastFourStar} />
          <Tabs
            items={tabItems}
            defaultActiveKey="1"
            style={{ height: "100%" }}
          ></Tabs>
        </Flex>
      </Card>
    );
  }
}
