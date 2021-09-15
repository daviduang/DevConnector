import React, { Fragment } from "react";
import spinner from "./spinner.gif";

/**
 * Loading spinner
 */
export default () => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{ width: "50px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </Fragment>
  );
};
