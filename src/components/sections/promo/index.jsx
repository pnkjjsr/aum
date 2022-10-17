import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import s from "./style.module.scss";

function Promo() {
  const router = useRouter();

  const handleSignup = (e) => {
    e.preventDefault();
    router.push("/signup");
  };

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
            <h1>An all-inclusive GST filing solution.</h1>

            <p>
              We are a technological platform with the sole purpose to
              streamline financial processes and help millions of Indian MSMEs
              reduce time and money seamlessly.
            </p>

            <div className={s.action}>
              <Button variant="contained" size="large" onClick={handleSignup}>
                Sign Up Now
              </Button>
            </div>
          </Grid>

          <Grid item md={7}>
            <Image
              src="/images/promo.png"
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
