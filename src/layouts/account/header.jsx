import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";

import { authCookie } from "@/utils/helper/method";

import s from "./style.module.scss";

function Header() {
  const router = useRouter();

  const handleLogout = (e) => {
    e.preventDefault();
    authCookie(false);
    router.push("/");
  };

  const handleDashboard = (e) => {
    e.preventDefault();
    router.push("/signup");
  };

  const handleMenu = (e) => {
    e.preventDefault();
  };

  return (
    <header className={s.header}>
      <div className={s.container}>
        <aside className={s.info}>
          {/* <IconButton size="large" aria-label="Dashboard" onClick={handleMenu}>
            <MenuIcon />
          </IconButton> */}

          <div className={s.logo}>
            <Link href="/">
              <a>
                <Image
                  src="/images/logo.svg"
                  width="89"
                  height="39"
                  alt="AUM Logo"
                />
              </a>
            </Link>
          </div>
        </aside>

        <aside className={s.action}>
          <IconButton
            size="large"
            color="primary"
            aria-label="Dashboard"
            onClick={handleDashboard}
          >
            <DashboardIcon />
          </IconButton>

          <IconButton
            size="large"
            aria-label="Dashboard"
            onClick={handleLogout}
          >
            <LogoutIcon />
          </IconButton>
        </aside>
      </div>
    </header>
  );
}

export default Header;
