import React, { useEffect, useState } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import AttentionBox from "monday-ui-react-core/dist/AttentionBox.js";

const monday = mondaySdk();

const App = ({}) => {
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

// class App extends React.Component {
//   constructor(props) {
//     super(props);

//     // Default state
//     this.state = {
//       settings: {},
//       name: "",
//     };
//   }

//   componentDidMount() {
//     // TODO: set up event listeners
//   }

//   render() {
//     return <div className="App">
//       <AttentionBox
//         title="Hello Monday Apps!"
//         text="Ready to start my app journey by building a view!"
//         type="success"
//       />
//     </div>;
//   }
// }

export default App;
