import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import validation from "./validation";

import s from "./style.module.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Signup(props) {
  const mobileRef = useRef();
  const [form, setForm] = useState({
    mobile: "",
    mobileErr: false,
    mobileErrText: "",
  });
  const [snack, setSnack] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    severity: "error",
    text: "",
  });

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

  const handleSubscribe = async (e) => {
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
      setSnack({
        ...snack,
        open: true,
        severity: "success",
        text: "Successfully Submitted",
      });

      el.value = "";
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnack({ ...snack, open: false });
  };

  const { vertical, horizontal, open, severity, text } = snack;
  const { mobile, mobileErr, mobileErrText } = form;

  return (
    <div className={s.form}>
      <form action="" onSubmit={handleSubscribe} noValidate autoComplete="off">
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
          <Button type="submit" fullWidth variant="contained" size="large">
            {props.btnText}
          </Button>
        </div>
      </form>

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
