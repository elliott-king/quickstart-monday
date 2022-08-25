import React from "react";
//Explore more Monday React Components here: https://style.monday.com/
// @ts-ignore (no declared types)
import { Flex } from "monday-ui-react-core";

export const RecyclingRemainder = () => (
  <Flex direction={Flex.directions.COLUMN} style={{ alignItems: "start" }}>
    <h4>Your Earned Recycling Badges</h4>
    <img src="remainder-ss.png" alt="ss of remainder options" />
  </Flex>
);
