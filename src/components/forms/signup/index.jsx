import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { auth } from "@/libs/firebase";
import { authCookie } from "@/utils/helper/method";

import validation from "./validation";
import s from "./style.module.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Signup(props) {
  const router = useRouter();
  const mobileRef = useRef();
  const otpRef = useRef();
  const [form, setForm] = useState({
    mobile: "",
    mobileErr: false,
    mobileErrText: "",
    otp: "",
    otpErr: false,
    otpErrText: "",
  });
  const [snack, setSnack] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    severity: "error",
    text: "",
  });
  const [view, setView] = useState(false);

  const handleValidation = (el) => {
    const data = { mobile: el };
    const { valid, errors } = validation(data);

    if (!valid) {
      setForm({
        ...form,
        mobileErr: true,
        mobileErrText: errors.mobile,
      });

      return false;
    }

    return true;
  };

  const handleOTPValidation = (el) => {
    const data = { otp: el };
    const { valid, errors } = validation(data);
    if (!valid) {
      setForm({
        ...form,
        otpErr: true,
        otpErrText: errors.otp,
      });
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    let el = e.target;
    let val = el.value;
    let name = el.name;

    let isValid = handleValidation(el);
    if (!isValid) return;

    let err = `${el.name}Err`;
    let errText = `${el.name}ErrText`;

    setForm({ ...form, [name]: val, [err]: false, [errText]: "" });
  };

  const postLogin = async () => {
    // @pankaj, 24 nov | Update: name and password not required.
    const data = {
      name: "Pankaj Jasoria",
      mobile: parseInt(form.mobile),
      password: "1234",
    };

    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return response.json();
  };

  const handleOTP = async (e) => {
    e.preventDefault();
    let el = mobileRef.current;

    let isValid = handleValidation(el);

    if (!isValid) {
      return setSnack({
        ...snack,
        open: true,
        severity: "error",
        text: form.mobileErrText || "Please enter mobile number",
      });
    } else {
      // postLogin()
      //   .then((res) => {
      //     if (res.code == "login/success") {
      //       setSnack({
      //         ...snack,
      //         open: true,
      //         severity: "success",
      //         text: "Successfully Submitted",
      //       });

      //       authCookie(true);
      //       router.push("/dashboard");
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      const phoneNumber = `+91${form.mobile}`;
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setView(true);
        })
        .catch((error) => {});

      el.value = "";
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let el = otpRef.current;
    let isValid = true;

    if (!el || el.value.length < 6) {
      setForm({
        ...form,
        otpErr: true,
        otpErrText: "Please enter correct OTP",
      });
      isValid = false;
    }

    if (!isValid) {
      return setSnack({
        ...snack,
        open: true,
        severity: "error",
        text: form.otpErrText || "Please enter OTP",
      });
    } else {
      const code = el.value;

      confirmationResult
        .confirm(code)
        .then((result) => {
          const user = result.user;
          setSnack({
            ...snack,
            open: true,
            severity: "success",
            text: "Successfully Submitted",
          });

          authCookie(true);
          router.push("/dashboard");
        })
        .catch((error) => {});

      el.value = "";
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnack({ ...snack, open: false });
  };

  const renderMobileScreen = () => {
    return (
      <form action="" noValidate autoComplete="off">
        <TextField
          onChange={handleChange}
          error={mobileErr}
          helperText={mobileErrText}
          fullWidth
          type="tel"
          name="mobile"
          label="Mobile Number"
          inputRef={mobileRef}
          inputProps={{
            maxLength: "10",
            pattern: "[0-9]{3}-[0-9]{2}-[0-9]{3}",
            autoComplete: "off",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+91</InputAdornment>
            ),
          }}
        />

        <div className={s.action}>
          <Button
            id="sign-in-button"
            type="button"
            fullWidth
            variant="contained"
            size="large"
            onClick={handleOTP}
          >
            Send OTP
          </Button>
        </div>
      </form>
    );
  };

  const renderOTPScreen = () => {
    return (
      <form action="" noValidate autoComplete="off">
        <TextField
          onChange={handleChange}
          error={otpErr}
          helperText={otpErrText}
          fullWidth
          type="password"
          name="otp"
          label="Enter OTP"
          inputRef={otpRef}
          inputProps={{
            maxLength: "6",
            pattern: "d*",
            autoComplete: "off",
          }}
        />

        <div className={s.action}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            size="large"
            onClick={handleLogin}
          >
            {props.btnText}
          </Button>
        </div>
      </form>
    );
  };

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        },
      },
      auth
    );
  }, []);

  const { vertical, horizontal, open, severity, text } = snack;
  const { mobile, mobileErr, mobileErrText, otp, otpErr, otpErrText } = form;

  return (
    <div className={s.form}>
      {(!view && renderMobileScreen()) || renderOTPScreen()}

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={mobileErrText}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Signup;
