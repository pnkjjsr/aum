import * as React from "react";
import nookies from "nookies";

import Layout from "@/layouts/index";
import Promo from "@/components/sections/promo";
import Feature from "@/components/sections/feature";

export default function Index(props) {
  return (
    <>
      <Layout auth={props.auth}>
        <Promo />
        <Feature />
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  let auth = cookies.auth ? cookies.auth : false;

  return {
    props: { auth },
  };
}
