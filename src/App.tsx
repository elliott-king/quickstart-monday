import React, { useState, useEffect, useRef } from "react";
import { DateTime } from "luxon";
import mondaySdk from "monday-sdk-js";
import "./App.css";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
// @ts-ignore (no declared types)
import { Box, Flex } from "monday-ui-react-core";
import { RecycleGraphPane } from "./components/RecycleGraph";
import { NotClippy } from "./components/NotClippy";
import { RecycleChecker, RecyclingNumbers } from "./components/RecycleChecker";
import { RecyclingMap } from "./components/RecyclingMap";
import { RecyclingRemainder } from "./components/RecyclingRemainder";
import { WidthStyle } from "./constants";

const DEFAULT_RECYCLABLES_COUNTS: Array<number> = Array(10).fill(0);
const WINDOW_WIDTH_BREAKPOINTS = [
  { label: WidthStyle.ONE_COL, value: 0 },
  { label: WidthStyle.TWO_COL_THIN, value: 800 },
  { label: WidthStyle.TWO_COL_MED, value: 900 },
  { label: WidthStyle.MAX, value: 1200 },
];

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

const getWidthBreakpoint = (windowWidth: number) => {
  for (let idx = 0; idx < WINDOW_WIDTH_BREAKPOINTS.length; idx++) {
    const { value } = WINDOW_WIDTH_BREAKPOINTS[idx];
    if (value > windowWidth) return WINDOW_WIDTH_BREAKPOINTS[idx - 1].label;
  }
  return WINDOW_WIDTH_BREAKPOINTS[WINDOW_WIDTH_BREAKPOINTS.length - 1].label;
};

const App = () => {
  // State
  const [recycleCount, setRecycleCount] = useState(0);
  const [last10DaysRecycleCount, setRecycleCounts] = useState(
    DEFAULT_RECYCLABLES_COUNTS
  );
  const [breakpoint, setBreakpoint] = useState(
    getWidthBreakpoint(document.documentElement.clientWidth)
  );
  const prevWindowWidth = useRef(document.documentElement.clientWidth);

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

  // Update state on window width changed
  useEffect(() => {
    const handleResize = () => {
      const newWidth = document.documentElement.clientWidth;
      WINDOW_WIDTH_BREAKPOINTS.forEach(({ value }) => {
        if (
          (prevWindowWidth.current < value && newWidth >= value) ||
          (prevWindowWidth.current >= value && newWidth < value)
        )
          setBreakpoint(getWidthBreakpoint(newWidth));
      });
      prevWindowWidth.current = newWidth;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  const firstColumn = (breakpoint: WidthStyle) => {
    let contents: JSX.Element | null = null;
    const graph = (
      <RecycleGraphPane
        count={recycleCount}
        historycounts={last10DaysRecycleCount}
        total={totalCount}
        streak={totalStreak}
        onReduceCount={reduceCount}
        onIncreaseCount={increaseCount}
        onSubmit={submitCount}
      />
    );
    const notClippy = <NotClippy />;

    if (
      breakpoint === WidthStyle.MAX ||
      breakpoint === WidthStyle.TWO_COL_MED
    ) {
      contents = (
        <>
          {graph}
          {notClippy}
        </>
      );
    } else if (breakpoint === WidthStyle.ONE_COL) {
      contents = (
        <>
          {notClippy}
          {graph}
        </>
      );
    } else
      contents = (
        <>
          {graph}
          <RecyclingNumbers />
        </>
      );

    return (
      <Flex
        direction={Flex.directions.COLUMN}
        gap={Flex.gaps.LARGE}
        style={{ padding: "30px" }}
      >
        {contents}
      </Flex>
    );
  };

  const secondColumn = (breakpoint: WidthStyle) => {
    if (breakpoint === WidthStyle.ONE_COL) return null;
    let contents: JSX.Element | null = null;
    if (breakpoint === WidthStyle.MAX) {
      contents = (
        <>
          <RecycleChecker />
          <Flex gap={Flex.gaps.LARGE}>
            <RecyclingMap breakpoint={breakpoint} />
            <RecyclingRemainder total={totalCount} />
          </Flex>
        </>
      );
    } else if (breakpoint === WidthStyle.TWO_COL_MED) {
      contents = (
        <>
          <RecyclingNumbers />
          <RecyclingMap breakpoint={breakpoint} />
        </>
      );
    } else
      contents = (
        <>
          <NotClippy />
          <RecyclingMap breakpoint={breakpoint} />
        </>
      );

    return (
      <Flex
        direction={Flex.directions.COLUMN}
        style={{ padding: "30px", borderLeft: "black 2px solid" }}
      >
        {contents}
      </Flex>
    );
  };

  return (
    <div className="App">
      <Box rounded={Box.roundeds.MEDIUM} border={Box.borders.DEFAULT}>
        <Flex>
          {firstColumn(breakpoint)}
          {secondColumn(breakpoint)}
        </Flex>
      </Box>
    </div>
  );
};

export default App;
