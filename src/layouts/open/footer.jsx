import React from "react";
import Container from "@mui/material/Container";

import s from "./style.module.scss";

function Footer() {
  return (
    <footer className={s.footer}>
      <Container className={s.container} maxWidth="lg">© AUM 2022, All Rights Reserved</Container>
    </footer>
  );
}

export default Footer;
