import React, { useState, useEffect } from "react";
import nookies from "nookies";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

import Layout from "@/layouts/account";

import s from "./style.module.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Dashboard() {
  const [form, setForm] = useState({
    type: "sale",
    file: "",
    fileErr: false,
    fileErrText: "",
  });
  const [snack, setSnack] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
    severity: "error",
    text: "",
  });
  const [list, setList] = useState([]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnack({ ...snack, open: false });
  };

  const handleValidation = () => {
    const { type, file } = form;

    if (!file) {
      setSnack({
        ...snack,
        open: true,
        severity: "error",
        text: "Please upload invoice file",
      });
      return false;
    }
    return true;
  };

  const handleRadio = (event) => {
    setForm({ ...form, type: event.target.value });
  };

  const handleFile = (event) => {
    setForm({ ...form, file: event.target.files[0] });
  };

  const postInvoice = async () => {
    const { type, file } = form;
    // @pankaj, 24 nov | Update: userID required from loing/signup api.

    // let newFile = {
    //   lastModified: file.lastModified,
    //   lastModifiedDate: file.lastModifiedDate,
    //   name: file.name,
    //   size: file.size,
    //   type: file.type,
    //   webkitRelativepath: file.webkitRelativepath,
    // };

    // const data = {
    //   u_id: 6,
    //   Image: file,
    //   File_Type: type,
    // };

    var formdata = new FormData();
    formdata.append("Image", file, file.name);
    formdata.append("File_Type", type);
    formdata.append("u_id", 6);

    //http://127.0.0.1:8000/uploadfile/
    const response = await fetch("/api/dashboard", {
      method: "POST",
      body: formdata, // JSON.stringify(data),
    });

    return response.json();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let isValid = handleValidation();

    if (isValid) {
      postInvoice()
        .then((res) => {
          console.log(res);
          if (res.code == "upload/success") {
            setSnack({
              ...snack,
              open: true,
              severity: "success",
              text: "Successfully Submitted",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });

      // setForm({ type: "sale", file: "" });
    }
  };

  const getInvoice = async () => {
    const res = await fetch(
      `/api/dashboard?` +
        new URLSearchParams({
          u_id: 6,
          File_Type: "sale",
        }),
      {
        method: "GET",
      }
    );
    const data = await res.json();
    setList(data);
  };

  const handleDeleteList = () => {
    alert("Delete API needed.");
  };

  const renderList = () => {
    return list.map((item, index) => {
      return (
        <List key={index}>
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={handleDeleteList}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <InsertDriveFileIcon />
              </Avatar>

              {/* <Avatar alt={item.File_Type} src={item.Image} /> */}
            </ListItemAvatar>
            <ListItemText primary={item.File_Type} />
          </ListItem>
        </List>
      );
    });
  };

  useEffect(() => {
    getInvoice();
  }, []);

  const { vertical, horizontal, open, severity, text } = snack;
  const { file, fileErr, fileErrText } = form;

  return (
    <Layout>
      <div className={s.dashboard}>
        <Container>
          <div className={s.header}>
            <h1 className={s.heading}>Welcome to your dashboard, </h1>
          </div>

          <FormControl>
            <FormLabel id="invoice-type">Type of invoice</FormLabel>
            <RadioGroup
              aria-labelledby="invoice-type"
              name="invoice-type-group"
              // defaultValue="sale"
              value={form.type}
              onChange={handleRadio}
            >
              <FormControlLabel value="sale" control={<Radio />} label="Sale" />
              <FormControlLabel
                value="purchase"
                control={<Radio />}
                label="Purchase"
              />
              <FormControlLabel
                value="credit"
                control={<Radio />}
                label="Credit Note"
              />
              <FormControlLabel
                value="debit"
                control={<Radio />}
                label="Debit Note"
              />
            </RadioGroup>
          </FormControl>

          <div className={s.upload}>
            <div className={s.label}>Upload your invoice here</div>
            <Button variant="outlined" component="label" size="large">
              Upload
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={handleFile}
              />
            </Button>
          </div>

          <div className={s.action}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>

          <div className={s.list}>{renderList()}</div>
        </Container>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={fileErrText}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {text}
        </Alert>
      </Snackbar>
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
