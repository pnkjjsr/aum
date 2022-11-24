import React from "react";
import Open from "./open";
import Account from "./account";

function Layout(props) {
  if (props.auth) return <Account>{props.children}</Account>;
  else if(!props.auth) return <Open>{props.children}</Open>;
}

export default Layout;
