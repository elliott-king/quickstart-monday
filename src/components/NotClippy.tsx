import React from "react";

// @ts-ignore (no declared types)
import { AttentionBox, Box, Flex } from "monday-ui-react-core";

export const NotClippy = () => (
  <Flex>
    <img src="/not-clippy.png" alt="hand-drawn crumpled plastic bottle" />
    <img
      src="/not-clippy-speech-bubble.png"
      alt="Plastic bags can take up to 1000 years to decompose"
      style={{ alignSelf: "start" }}
    />
  </Flex>
);
