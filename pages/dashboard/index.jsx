import React from "react";
import nookies from "nookies";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Layout from "@/layouts/account";

import s from "./style.module.scss";

function Dashboard() {
  return (
    <Layout>
      <div className={s.dashboard}>
        <Container>
          <div className={s.header}>
            <h1 className={s.heading}>Welcome to your dashboard, </h1>
          </div>

          <div className={s.upload}>
            <div className={s.label}>Upload your invoice here</div>
            <Button variant="contained" component="label" size="large">
              Upload
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </div>
        </Container>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  let auth = cookies.auth;

  if (!auth) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Dashboard;
