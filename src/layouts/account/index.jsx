import React from "react";
import Header from "./header";
import Footer from "./footer";

import s from "./style.module.scss";

function Layout(props) {
  return (
    <>
      <Header />
      <main className={s.main}>{props.children}</main>
      <Footer />
    </>
  );
}

export default Layout;
