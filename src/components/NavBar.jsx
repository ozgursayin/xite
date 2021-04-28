import React from "react";

import logo from "./xitelogo.png";
import "../design.css";

const NavBar = () => {
  return (
    <div className="navBarTop">
      <img className="logo" src={logo} alt="XITE" />
    </div>
  );
};

export default NavBar;
