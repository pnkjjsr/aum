import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CheckIcon from "@mui/icons-material/Check";

import s from "./style.module.scss";

function Feature() {
  return (
    <section className={s.feature}>
      <Container>
        <div className={s.header}>
          <h2>Accept Payments with Razorpay Payment Suite</h2>
        </div>

        <div className={s.content}>
          <Grid container spacing={1}>
            <Grid item md={6}>
              <h3 className={s.heading}>
                Supercharge your business with the all‑powerful Payment Gateway
              </h3>

              <ul>
                <li>
                  <CheckIcon color="primary" fontSize="small" /> 100+ Payment
                  Methods
                </li>
                <li>
                  <CheckIcon color="primary" fontSize="small" /> Industry
                  Leading Success Rate
                </li>
                <li>
                  <CheckIcon color="primary" fontSize="small" /> Superior
                  Checkout Experience
                </li>
                <li>
                  <CheckIcon color="primary" fontSize="small" /> Easy to
                  Integrate
                </li>
                <li>
                  <CheckIcon color="primary" fontSize="small" /> Instant
                  Settlements from day 1
                </li>
                <li>
                  <CheckIcon color="primary" fontSize="small" /> In-depth
                  Reporting and Insights
                </li>
              </ul>

              <div className={s.action}>
                <Button variant="contained" size="large">
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
