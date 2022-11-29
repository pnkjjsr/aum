import React from "react";
import nookies from "nookies";
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
                    <h1>Login to Dashboard</h1>
                  </div>

                  <SignupForm btnText="Log In" />
                </div>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  let auth = cookies.auth;

  if (auth) {
    return {
      redirect: {
        destination: "dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}
