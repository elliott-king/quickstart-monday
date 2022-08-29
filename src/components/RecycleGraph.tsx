import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// @ts-ignore (no declared types)
import { Button, Flex } from "monday-ui-react-core";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartContainer = ({
  counts,
  total,
  streak,
}: {
  counts: Array<number>;
  total: number;
  streak: number;
}) => {
  const chartData = {
    labels: counts,
    datasets: [
      {
        label: "Recycling counts",
        data: counts,
        backgroundColor: "rgba(99, 116, 69, 1)",
        borderColor: "rgba(142, 167, 96, 1)",
      },
    ],
  };

  const chartConfig = {
    type: "line",
    data: counts,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      xAxis: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      yAxis: {
        min: 0,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <div
      id="recycle-line-chart-container"
      style={{
        background: "rgba(202, 217, 173, 0.2)",
        padding: "10px 22px 10px 22px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <strong>
          {streak ? `${streak}-day streak!` : "Start a streak by recycling!"}
        </strong>
      </div>
      <Line options={chartConfig} data={chartData} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: ".25em",
        }}
      >
        <strong># of plastics recycled: {total}</strong>
      </div>
    </div>
  );
};

const RemoveButton = (props: React.HTMLAttributes<SVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="12" cy="12" r="9" stroke="#404040" strokeWidth="2" />
    <path d="M7.5 12H16.5" stroke="#404040" strokeWidth="2" />
  </svg>
);

const AddButton = (props: React.HTMLAttributes<SVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="12" cy="12" r="9" stroke="#404040" strokeWidth="2" />
    <path
      d="M12 15L12 9"
      stroke="#404040"
      strokeWidth="2"
      strokeLinecap="square"
    />
    <path
      d="M15 12L9 12"
      stroke="#404040"
      strokeWidth="2"
      strokeLinecap="square"
    />
  </svg>
);

export const RecycleGraphPane = ({
  count,
  historycounts,
  total,
  streak,
  onReduceCount,
  onIncreaseCount,
  onSubmit,
}: {
  count: number;
  historycounts: Array<number>;
  total: number;
  streak: number;
  onReduceCount: () => void;
  onIncreaseCount: () => void;
  onSubmit: () => void;
}) => {
  return (
    <Flex direction={Flex.directions.COLUMN} gap={Flex.gaps.SMALL}>
      <ChartContainer counts={historycounts} total={total} streak={streak} />
      <Flex gap={Flex.gaps.SMALL}>
        <div>
          <div>
            <strong>Plastic</strong>
          </div>
          <div>
            <strong>Recyclables</strong>
          </div>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center" }}>
          <RemoveButton
            onClick={onReduceCount}
            style={{ cursor: "pointer", userSelect: "none" }}
          />
          &nbsp;{count}&nbsp;
          <AddButton
            onClick={onIncreaseCount}
            style={{ cursor: "pointer", userSelect: "none" }}
          />
        </span>
        <Button color={Button.colors.POSITIVE} onClick={onSubmit}>
          Submit
        </Button>
      </Flex>
    </Flex>
  );
};
