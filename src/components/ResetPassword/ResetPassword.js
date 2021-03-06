import React, { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Container, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core";
import Link from "@material-ui/core/Link";

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

const ResetPassword = (props) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");

  // const handleChange = (e) => {
  //   setAuthInfo({
  //     ...authInfo,
  //     [e.target.name]: e.target.value,
  //   });
  //   // console.log(authInfo);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setUsernameError(false);
  //   setPasswordError(false);
  //   setAccessError(false);
  //   if (authInfo.username == "") {
  //     setUsernameError(true);
  //   }
  //   if (authInfo.password == "") {
  //     setPasswordError(true);
  //   }
  //   if (authInfo.username && authInfo.password) {
  //     // console.log(authInfo.username, authInfo.password);
  //     axios
  //       .post("/auth/login", authInfo)
  //       .then((response) => {
  //         dispatch(updateUsername(response.data.username));
  //         dispatch(updateUserId(response.data.id));
  //         props.history.push("/dashboard");
  //       })
  //       .catch(() => {
  //         setAccessError(true);
  //       });
  //   }
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("aqui 88");
    const newObj = { email };
    console.log(newObj);
    axios
      .post("/auth/resetpassword", newObj)
      .then(() => {
        console.log("se envi?? bien");
      })
      .catch(() => {
        console.log("hubo algun error");
      });
  };

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
              To reset your password, please provide your email address.
            </Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                className={classes.field}
                name="Email"
                variant="outlined"
                label="Email"
                color="secondary"
                required
                onChange={(e) => setEmail(e.target.value)}
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
              >
                Send reset instructions
              </Button>
              <Typography
                style={{ textAlign: "right", fontSize: 14 }}
                color="secondary"
              >
                If you don't have an account{" "}
                <Link href="/register" variant="body2">
                  register here
                </Link>
              </Typography>
            </form>
            {/* {accessError ? (
              <Alert severity="error" className={classes.error}>
                Username or password is incorrect.
              </Alert>
            ) : null} */}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ResetPassword;
