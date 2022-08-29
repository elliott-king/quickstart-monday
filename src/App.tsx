import React from "react";
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

const App = () => (
  <div className="App">
    <Box rounded={Box.roundeds.MEDIUM} border={Box.borders.DEFAULT}>
      <Flex>
        <Flex
          direction={Flex.directions.COLUMN}
          gap={Flex.gaps.LARGE}
          style={{ padding: "30px" }}
        >
          <RecycleGraphPane />
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
            <RecyclingRemainder />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  </div>
);

export default App;
