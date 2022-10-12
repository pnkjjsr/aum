import React from "react";
import Image from "next/image";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import s from "./style.module.scss";

function Promo() {
  return (
    <section className={s.promo}>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item md={5}>
            <h1>Power your finance, grow your business</h1>

            <p>
              Accept payments from customers. Automate payouts to vendors &amp;
              employees. Never run out of working capital.
            </p>

            <div className={s.action}>
              <Button variant="contained" size="large">
                Sign Up Now
              </Button>
            </div>
          </Grid>

          <Grid item md={7}>
            <Image
              src="/images/promo.jpg"
              width="644"
              height="670"
              alt="Power your finance, grow your business"
            />
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

export default Promo;
