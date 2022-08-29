import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import mondaySdk from "monday-sdk-js";
import "./App.css";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
// @ts-ignore (no declared types)
import { Box, Flex } from "monday-ui-react-core";
import { RecycleGraphPane } from "./components/RecycleGraph";
import { NotClippy } from "./components/NotClippy";
import { RecycleChecker } from "./components/RecycleChecker";
import { RecyclingMap } from "./components/RecyclingMap";
import { RecyclingRemainder } from "./components/RecyclingRemainder";

const DEFAULT_RECYCLABLES_COUNTS: Array<number> = Array(10).fill(0);

declare global {
  // Allows us to add debug method to global window handler
  interface Window {
    debugBackfill: any;
  }
}

const monday = mondaySdk();

const currentDateStr = () => DateTime.utc().toISODate();

const lastTenDaysAsIsoStrings = () => {
  let date = DateTime.utc();
  const dates: Array<string> = [];
  for (let i = 0; i < 10; i++) {
    dates.unshift(date.toISODate());
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

const App = () => {
  // State
  const [recycleCount, setRecycleCount] = useState(0);
  const [last10DaysRecycleCount, setRecycleCounts] = useState(
    DEFAULT_RECYCLABLES_COUNTS
  );

  // Derived state
  const totalCount = last10DaysRecycleCount.reduce(
    (total, curr) => total + curr,
    0
  );
  const totalStreak = last10DaysRecycleCount.reduce(
    (total, curr) => (curr ? total + 1 : 0),
    0
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
        return parseInt(res.data?.value || 0);
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

  const increaseCount = () => setRecycleCount(recycleCount + 1);

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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const setPromise = monday.storage.instance.setItem(
          currentDate,
          totalToday
        );

        // Used for debugging
        // setPromise.then((res) => {
        //   console.log(res);
        //   monday.storage.instance
        //     .getItem(currentDate)
        //     .then((res) => console.log(res.data));
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
    <div className="App">
      <Box rounded={Box.roundeds.MEDIUM} border={Box.borders.DEFAULT}>
        <Flex>
          <Flex
            direction={Flex.directions.COLUMN}
            gap={Flex.gaps.LARGE}
            style={{ padding: "30px" }}
          >
            <RecycleGraphPane
              count={recycleCount}
              historycounts={last10DaysRecycleCount}
              total={totalCount}
              streak={totalStreak}
              onReduceCount={reduceCount}
              onIncreaseCount={increaseCount}
              onSubmit={submitCount}
            />
            <NotClippy />
          </Flex>
          <Flex
            direction={Flex.directions.COLUMN}
            style={{ padding: "30px", borderLeft: "black 2px solid" }}
          >
            {/* TODO: change favicon */}
            {/* todo: search bar */}
            <RecycleChecker />
            <Flex gap={Flex.gaps.LARGE}>
              <RecyclingMap />
              <RecyclingRemainder total={totalCount} />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
};

export default App;
