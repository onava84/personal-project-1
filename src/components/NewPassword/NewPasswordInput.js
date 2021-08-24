import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUsername, updateUserId } from "../../redux/reducer";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Container, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles({
  field: {
    // display: "inline",
    marginTop: 10,
    marginBottom: 10,
  },
  btn: {
    marginTop: 10,
    marginBottom: 10,
  },
  card: {
    padding: 40,
    // boxShadow: "none",
    // border: "solid 1px #C8C8C8	",
  },
  contenedor: {
    // backgroundColor: "#F5F5F5",
    // height: "100vh",
    width: "100%",
    maxWidth: "600px",
  },
  heading: {
    textAlign: "left",
    marginBottom: 10,
    fontWeight: "bold",
  },
});

const NewPasswordInput = (props) => {
  const classes = useStyles();
  const [authInfo, setAuthInfo] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [accessError, setAccessError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);

  ////
  const [newPassword, setNewPassword] = useState("");
  const [confNewPassword, setConfNewPassword] = useState("");

  const handleChange = (e) => {
    setAuthInfo({
      ...authInfo,
      [e.target.name]: e.target.value,
    });
    // console.log(authInfo);
  };

  const handleSubmit = (e) => {
    if (newPassword === confNewPassword) {
      // axios.post;
    }
  };

  // console.log(email);

  return (
    <Container className={classes.contenedor}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ height: "60vh" }}
      >
        <Grid item>
          <Card className={classes.card} variant="outlined">
            <Typography
              variant="h5"
              component="h1"
              className={classes.heading}
              color="secondary"
            >
              Reset password
            </Typography>
            <Typography style={{ textAlign: "left" }} color="secondary">
              Select a new password and confirm it.
            </Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                className={classes.field}
                name="password"
                variant="outlined"
                label="Enter a new password"
                color="secondary"
                type="password"
                required
                onChange={(e) => setNewPassword(e.target.value)}
                // error={usernameError}
                fullWidth
              ></TextField>
              <TextField
                className={classes.field}
                name="confpassword"
                variant="outlined"
                label="Confirm password"
                color="secondary"
                required
                onChange={(e) => setConfNewPassword(e.target.value)}
                // error={usernameError}
                fullWidth
              ></TextField>

              <Button
                className={classes.btn}
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disableElevation
                fullWidth
                // onClick={console.log(authInfo)}
              >
                Set new password
              </Button>
              <Typography
                style={{ textAlign: "right", fontSize: 14 }}
                color="secondary"
              >
                If you don't have an account{" "}
                <Link href="/#/register" variant="body2">
                  register here
                </Link>
              </Typography>
            </form>
            {accessError ? (
              <Alert severity="error" className={classes.error}>
                Username or password is incorrect.
              </Alert>
            ) : null}
            {usernameError || passwordError ? (
              <Alert severity="error" className={classes.error}>
                You must enter a username and password.
              </Alert>
            ) : null}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewPasswordInput;
