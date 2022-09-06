import React from "react";

// @ts-ignore (no declared types)
import { Flex } from "monday-ui-react-core";
import { WidthStyle } from "../constants";

export const NotClippy = ({
  breakpoint = WidthStyle.MAX,
}: {
  breakpoint?: WidthStyle;
}) => (
  <Flex
    direction={
      breakpoint === WidthStyle.TWO_COL_THIN
        ? Flex.directions.COLUMN
        : Flex.directions.ROW
    }
  >
    <img src="/not-clippy-2.png" alt="hand-drawn crumpled plastic bottle" />
    <img
      src="/not-clippy-speech-bubble.png"
      alt="Plastic bags can take up to 1000 years to decompose"
      style={{ alignSelf: "start" }}
    />
  </Flex>
);
