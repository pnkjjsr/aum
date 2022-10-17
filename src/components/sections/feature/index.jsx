import React from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CheckIcon from "@mui/icons-material/Check";

import s from "./style.module.scss";

function Feature() {
  const router = useRouter();

  const handleSignup = (e) => {
    e.preventDefault();
    router.push("/signup");
  };

  return (
    <section className={s.feature}>
      <Container>
        <div className={s.header}>
          <h2>A faster way to save money & time.</h2>
        </div>

        <div className={s.content}>
          <Grid container spacing={1}>
            <Grid item md={6}>
              <h3 className={s.heading}>
                Save money. Save time. Boost your business.
              </h3>

              <ul>
                <li>
                  <CheckIcon color="primary" fontSize="small" /> #1 GST platform
                  for MSMEs
                </li>
                <li>
                  <CheckIcon color="primary" fontSize="small" /> Saved 1.8M+
                  man-hours
                </li>
                <li>
                  <CheckIcon color="primary" fontSize="small" /> Annual tax
                  savings of ₹1 Cr plus
                </li>
                <li>
                  <CheckIcon color="primary" fontSize="small" /> Tax reductions
                  for MSMEs of 2–7%
                </li>
              </ul>

              <div className={s.action}>
                <Button variant="contained" size="large" onClick={handleSignup}>
                  Sign Up Now <ArrowForwardIcon fontSize="small" />
                </Button>

                {/* <Button variant="link" size="large">
                  Know More <KeyboardArrowRightIcon fontSize="small" />
                </Button> */}
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  );
}

export default Feature;
