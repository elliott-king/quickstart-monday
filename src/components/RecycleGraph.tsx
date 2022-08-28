import React, { useState } from "react";

// @ts-ignore (no declared types)
import { Button, Flex } from "monday-ui-react-core";

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

export const RecycleGraphPane = () => {
  const [recycleCount, setRecycleCount] = useState(0);
  const reduceCount = () =>
    setRecycleCount((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
    });
  return (
    <Flex direction={Flex.directions.COLUMN} gap={Flex.gaps.SMALL}>
      <img src="graph-ss.png" alt="recycle graph" />
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
          <RemoveButton onClick={reduceCount} style={{ cursor: "pointer" }} />
          &nbsp;{recycleCount}&nbsp;
          <AddButton
            onClick={() => setRecycleCount(recycleCount + 1)}
            style={{ cursor: "pointer" }}
          />
        </span>
        {/* todo: actually do something with this */}
        <Button onClick={() => setRecycleCount(0)}>Submit</Button>
      </Flex>
    </Flex>
  );
};
