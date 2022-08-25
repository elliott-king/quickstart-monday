import React from "react";
//Explore more Monday React Components here: https://style.monday.com/
// @ts-ignore (no declared types)
import { Flex } from "monday-ui-react-core";

export const RecyclingMap = () => (
  <Flex direction={Flex.directions.COLUMN} style={{ alignItems: "center" }}>
    <h4>Recycling Locations Near You:</h4>
    <img src="map-ss.png" alt="screenshot of a map" />
  </Flex>
);
