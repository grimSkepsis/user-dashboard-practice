import React from "react";
import ReactDOM from "react-dom";
import Test from "./Test";

const App = () => {
  return (
    <div>
      <h1>Test title</h1>
      <Test test="test val" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));