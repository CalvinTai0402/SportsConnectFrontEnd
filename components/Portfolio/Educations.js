import React, { Fragment } from "react";
import Template from "./Template";

export default function Educations() {
  return (
    <Fragment>
      <Fragment>
        <Template endpoint={"/educations/"} />
      </Fragment>
    </Fragment>
  );
}
