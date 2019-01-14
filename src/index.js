import React from "react";
import Component from "./Component";

if (process.env.NODE_ENV === "development") {
  const ReactDOM = require("react-dom");
  ReactDOM.render(<Component />, document.getElementById("root"));
}

export default Component;
