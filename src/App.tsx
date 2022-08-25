import React, { useEffect, useState } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
// @ts-ignore (no declared types)
import { AttentionBox } from "monday-ui-react-core";

const monday = mondaySdk();

const App = () => {
  const [settings, setSettings] = useState({});
  const [name, setName] = useState("");

  useEffect(() => {
    // TODO: set up event listeners
  }, []);

  return (
    <div className="App">
      <AttentionBox
        title="Hello Monday Apps!"
        text="Ready to start my app journey by building a view!"
        type="success"
      />
    </div>
  );
};

export default App;
