import * as React from 'react';

import Layout from "@/layouts/open"
import Promo from "@/components/sections/promo"
import Feature from "@/components/sections/feature"

export default function Index() {
  return (
    <>
      <Layout>
        <Promo />
        <Feature />
      </Layout>
    </>
  );
}