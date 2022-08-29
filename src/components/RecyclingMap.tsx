import React from "react";
//Explore more Monday React Components here: https://style.monday.com/
// @ts-ignore (no declared types)
import { Flex } from "monday-ui-react-core";

const API_KEY = "AIzaSyDY0FxIMQhH_DDlNWH_-rVAcwUZY7uITYc";

export const RecyclingMap = () => (
  <Flex direction={Flex.directions.COLUMN} style={{ alignItems: "center" }}>
    <h4>Recycling Locations Near You:</h4>
    <iframe
      width="325"
      height="206"
      style={{ border: 0 }}
      title="recycling centers map"
      loading="lazy"
      allowFullScreen
      src={`https://www.google.com/maps/embed/v1/search?q=recycling%20center&key=${API_KEY}`}
    ></iframe>
  </Flex>
);
