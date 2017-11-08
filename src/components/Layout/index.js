import React from "react";

import "./index.css";

const Layout = props => (
  <div className="Layout">
    <header className="Layout__Header">{props.header}</header>
    <main className="Layout__Main">{props.main}</main>
  </div>
);

export default Layout;
