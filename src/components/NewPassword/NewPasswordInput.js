import React, { useState, useEffect } from "react";
// // import axios from "axios";
// import { useDispatch } from "react-redux";
// import { updateUsername, updateUserId } from "../../redux/reducer";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Container, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { Alert } from "@material-ui/lab";
import axios from "axios";

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
  ////
  const [newPassword, setNewPassword] = useState("");
  const [confNewPassword, setConfNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState(props.match.params.id);

  useEffect(() => {
    axios
      .get(`/auth/verifyemail/${id}`)
      .then((response) => {
        setEmail(response.data.email);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confNewPassword) {
      const objToPost = {
        email,
        id,
        newPassword,
      };
      axios
        .post("/auth/updatepassword", objToPost)
        .then(() => console.log("El password se ha actualizado"))
        .catch((e) => console.log(e));
    }
  };

  console.log(email);
  console.log(id);

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
                fullWidth
              ></TextField>
              <TextField
                className={classes.field}
                name="confpassword"
                variant="outlined"
                label="Confirm password"
                color="secondary"
                type="password"
                required
                onChange={(e) => setConfNewPassword(e.target.value)}
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
                <Link href="/register" variant="body2">
                  register here
                </Link>
              </Typography>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewPasswordInput;
