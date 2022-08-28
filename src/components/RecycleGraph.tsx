import React, { useState } from "react";
import { DateTime } from "luxon";
import mondaySdk from "monday-sdk-js";

// @ts-ignore (no declared types)
import { Button, Flex } from "monday-ui-react-core";
import { useEffect } from "react";

const DEFAULT_RECYCLABLES_COUNTS: Array<number> = Array(10).fill(0);

declare global {
  // Allows us to add debug method to global window handler
  interface Window {
    debugBackfill: any;
  }
}

const monday = mondaySdk();

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

const currentDateStr = () => DateTime.utc().toISODate();

const lastTenDaysAsIsoStrings = () => {
  let date = DateTime.utc();
  const dates: Array<string> = [];
  for (let i = 0; i < 10; i++) {
    dates.push(date.toISODate());
    date = date.minus({ days: 1 });
  }
  return dates;
};

/** Debug method to backfill last ten days with random data */
const debugBackfill = (
  setRecycleCounts: React.Dispatch<React.SetStateAction<Array<number>>>
) => {
  const datestrs = lastTenDaysAsIsoStrings();
  const max = 10;
  const counts = [...DEFAULT_RECYCLABLES_COUNTS];
  datestrs.forEach((dtstr, i) => {
    const value = Math.floor(Math.random() * max);
    monday.storage.instance.setItem(dtstr, value);
    counts[i] = value;
  });
  setRecycleCounts(counts);
};

export const RecycleGraphPane = () => {
  const [recycleCount, setRecycleCount] = useState(0);
  const [last10DaysRecycleCount, setRecycleCounts] = useState(
    DEFAULT_RECYCLABLES_COUNTS
  );

  // On first render, fetch recycling history of this instance
  // Note that this is only instance-level storage
  // https://developer.monday.com/apps/docs/advanced-view#saving-persistent-data-using-the-mondaycom-storage-api
  useEffect(() => {
    const isoStrings = lastTenDaysAsIsoStrings();
    // NOTE: getItem only works on a dashboard. Does not work locally.
    const promises = isoStrings.map((dtstr) =>
      monday.storage.instance.getItem(dtstr).then((res) => {
        // console.log(dtstr);
        // console.log(res.data);
        return res.data?.value || 0;
      })
    );
    Promise.all(promises).then(setRecycleCounts);
  }, []);

  useEffect(() => {
    window.debugBackfill = () => debugBackfill(setRecycleCounts);
    return () => (window.debugBackfill = undefined);
  }, []);

  const reduceCount = () =>
    setRecycleCount((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
    });

  const submitCount = () => {
    // Update number in both states & also send to Monday API to store
    setRecycleCount(() => {
      setRecycleCounts((prev) => {
        if (prev.length < 1) return prev;

        // Make a copy to avoid directly mutating state
        const copy = [...prev];
        const totalToday = copy[copy.length - 1] + recycleCount;

        // Update storage on API
        const currentDate = currentDateStr();
        monday.storage.instance.setItem(currentDate, totalToday);
        // Used for debugging
        // (res) => {
        // console.log(res);
        // monday.storage.instance.getItem(currentDate).then(console.log);
        // });

        // Update 10-day recycle count history
        copy[copy.length - 1] = totalToday;
        return copy;
      });
      // Update single-value shown as number
      return 0;
    });
  };
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
          <RemoveButton
            onClick={reduceCount}
            style={{ cursor: "pointer", userSelect: "none" }}
          />
          &nbsp;{recycleCount}&nbsp;
          <AddButton
            onClick={() => setRecycleCount(recycleCount + 1)}
            style={{ cursor: "pointer", userSelect: "none" }}
          />
        </span>
        <Button onClick={submitCount}>Submit</Button>
      </Flex>
    </Flex>
  );
};
