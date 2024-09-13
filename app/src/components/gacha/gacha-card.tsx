import { getConveneName } from "@/models/gacha/convene";
import { GachaItem } from "@/models/gacha/gacha-item";
import { GachaLog } from "@/models/gacha/gacha-log";
import { Card, Statistic, Select, Empty, Flex, Divider } from "antd";
import GachaAvatarCard from "./gacha-avatar-card";
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

    const titleItems = props.data.map((value: GachaLog, index: number) => {
      return {
        value: index,
        label: getConveneName(value.convene),
      };
    });
    return (
      <Card
        className="h-full"
        title={getConveneName(currentGacha.convene)}
        extra={
          <Select
            options={titleItems}
            onChange={(value) => setCurrentGacha(props.data[value])}
            defaultValue={0}
          ></Select>
        }
        classNames={{ body: "h-full" }}
      >
        <Flex vertical={true} className="h-full">
          <Flex justify="space-around" className="flex-shrink-0">
            <div>
              <Statistic
                title="总抽数"
                value={currentGacha.items.length}
                className="flex-shrink-0"
              />
              <Statistic
                title="距离上个五星"
                value={lastFiveStar}
                className="flex-shrink-0"
              />
              <Statistic
                title="距离上个四星"
                value={lastFourStar}
                className="flex-shrink-0"
              />
            </div>
            <div>
              <Statistic
                title="五星平均抽数"
                value={averageFiveStar}
                className="flex-shrink-0"
              />
              <Statistic
                title="四星平均抽数"
                value={averageFourStar}
                className="flex-shrink-0"
              />
            </div>
          </Flex>

          <Divider className="flex-shrink-0" />
          <Flex
            justify="flex-start"
            wrap="wrap"
            className="flex-shrink overflow-auto"
          >
            {fiveStarItems.map((item, index) => (
              <GachaAvatarCard
                key={index}
                number={fiveStarDistances[index]}
                name={item.name}
                resourceId={item.id}
              />
            ))}
          </Flex>
        </Flex>
      </Card>
    );
  }
}
