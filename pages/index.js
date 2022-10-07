import * as React from 'react';
import Image from "next/image";

export default function Index() {
  return (
    <>
      <header className="">
        <div className="logo">
          <Image src="/images/logo.svg" width="93" height="40" />
        </div>
      </header>
    </>
  );
}