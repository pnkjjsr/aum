import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { purple } from "@mui/material/colors";

import s from "./style.module.scss";

// const LoginButton = styled(Button)(({ theme }) => ({
//   borderColor: theme.palette.primary.main,
//   color: theme.palette.getContrastText(purple[500]),
//   textTransform: "capitalize",
// }));
// const SignupButton = styled(Button)(({ theme }) => ({
//   backgroundColor: theme.palette.getContrastText(purple[500]),
//   color: theme.palette.primary.main,
//   textTransform: "capitalize",

//   "&:hover": {
//     backgroundColor: theme.palette.getContrastText(purple[500]),
//   },
// }));

function Header() {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/login");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    router.push("/signup");
  };

  return (
    <header className={s.header}>
      <Container className={s.container} maxWidth="lg">
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

        <div className={s.action}>
          <Button variant="outlined" onClick={handleLogin}>
            Log In
          </Button>
          <Button variant="contained" onClick={handleSignup}>
            Sign Up <ArrowForwardIcon fontSize="small" />
          </Button>
        </div>
      </Container>
    </header>
  );
}

export default Header;
