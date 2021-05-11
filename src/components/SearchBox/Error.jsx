import React from "react";
import "../../design.css";

const Error = ({ error }) => {
  return <div className="screenMessage">{error}</div>;
};

export default Error;
