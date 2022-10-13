import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Layout from "@/layouts/open";
import SignupForm from "@/components/forms/signup";

import s from "./style.module.scss";

export default function Signup() {
  return (
    <>
      <Layout>
        <div className={s.signup}>
          <Container>
            <Grid container spacing={2} justifyContent="center">
              <Grid item md={6}>
                <div className={s.content}>
                  <div className={s.header}>
                    <h1>What’s your mobile number?</h1>
                  </div>

                  <SignupForm />
                </div>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Layout>
    </>
  );
}
