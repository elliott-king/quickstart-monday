import React, { useEffect, useState } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
// @ts-ignore (no declared types)
import { AttentionBox, Box, Flex } from "monday-ui-react-core";
import { RecycleGraph } from "./components/RecycleGraph";
import { NotClippy } from "./components/NotClippy";
import { RecycleChecker } from "./components/RecycleChecker";
import { RecyclingMap } from "./components/RecyclingMap";
import { RecyclingRemainder } from "./components/RecyclingRemainder";

const monday = mondaySdk();

const App = () => {
  const [settings, setSettings] = useState({});
  const [name, setName] = useState("");

  useEffect(() => {
    // TODO: set up event listeners
    // TODO: change favicon
  }, []);

  return (
    <div className="App">
      <Box rounded={Box.roundeds.MEDIUM} border={Box.borders.DEFAULT}>
        <Flex>
          <Flex
            direction={Flex.directions.COLUMN}
            gap={Flex.gaps.LARGE}
            style={{ padding: "30px" }}
          >
            <RecycleGraph />
            <NotClippy />
          </Flex>
          <Flex
            direction={Flex.directions.COLUMN}
            style={{ padding: "30px", borderLeft: "black 2px solid" }}
          >
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
};

export default App;
