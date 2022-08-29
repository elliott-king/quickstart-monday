import React from "react";
//Explore more Monday React Components here: https://style.monday.com/
// @ts-ignore (no declared types)
import { Flex, Tooltip } from "monday-ui-react-core";

const RECYCLING_BENCHMARKS = [1, 4, 10, 20, 50, 100];
const BADGES = [
  "lvl1-badge.png",
  "lvl2-badge.png",
  "lvl3-badge.png",
  "lvl4-badge.png",
  "lvl5-badge.png",
  "lvl6-badge.png",
];

/** Number of badges user has */
const badgeLevel = (total: number) => {
  for (let i = 0; i < RECYCLING_BENCHMARKS.length; i++) {
    const bench = RECYCLING_BENCHMARKS[i];
    if (bench > total) return i;
  }
  return RECYCLING_BENCHMARKS.length;
};

const Badge = ({ image, bench }: { image: string; bench: number }) => (
  <div id={`badge-${bench}-tooltip-container`}>
    <Tooltip
      content={
        bench === 1
          ? `Started your recycling journey`
          : `Recycled ${bench} items!`
      }
    >
      <img src={image} alt={`badge for recycling ${bench} items`} />
    </Tooltip>
  </div>
);

const badges = (total: number) => {
  let level = badgeLevel(total);
  if (level === 0) return null;

  const badges: Array<JSX.Element> = [];
  for (let i = 0; i < level; i++) {
    const image = BADGES[i];
    const bench = RECYCLING_BENCHMARKS[i];
    badges.push(<Badge image={image} bench={bench} key={bench} />);
  }
  return badges;
};

export const RecyclingRemainder = ({ total }: { total: number }) => {
  return (
    <Flex
      direction={Flex.directions.COLUMN}
      style={{ alignItems: "start" }}
      gap={Flex.gaps.LARGE}
    >
      <h4>Your Earned Recycling Badges</h4>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          background: "rgba(158, 181, 113, 0.8)",
          border: "1px solid #646464",
          borderRadius: "6px",
          height: "55px",
          width: "100%",
        }}
      >
        {badges(total)}
      </div>
      <img src="walkway-remainder.png" alt="" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "55px",
          width: "100%",
          background: "rgba(222, 226, 214, 0.8)",
          border: "1px solid #949494",
          borderRadius: "6px",
        }}
      >
        <strong>
          <a
            href="https://www.epa.gov/recycle/frequent-questions-recycling"
            target="_blank"
            rel="noreferrer"
          >
            Frequently Asked Questions
          </a>
        </strong>
      </div>
    </Flex>
  );
};
