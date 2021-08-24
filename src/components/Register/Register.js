import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUsername, updateUserId } from "../../redux/reducer";
import { Link } from "@material-ui/core";
// import "./CreateTournament.css";
import {
  TextField,
  makeStyles,
  Typography,
  Button,
  Container,
  Grid,
  Card,
} from "@material-ui/core";
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
  error: {
    marginTop: 10,
  },
});

const Register = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  ///Errors
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfError, setPasswordConfError] = useState(false);

  // const [showError, setShowError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const [equalPassError, setEqualPassError] = useState(false);
  const [duplicatedUserError, setduplicatedUserError] = useState(false);
  const [realEmailError, setRealEmailError] = useState(false);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePasswordConfChange = (e) => setPasswordConf(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsernameError(false);
    setEmailError(false);
    setPasswordError(false);
    setPasswordConfError(false);
    setEmptyError(false);
    setEqualPassError(false);
    setRealEmailError(false);
    setduplicatedUserError(false);

    if (username == "") {
      setUsernameError(true);
    }
    if (email == "") {
      setEmailError(true);
    }
    if (password == "") {
      setPasswordError(true);
    }
    if (passwordConf == "") {
      setPasswordConfError(true);
    }

    if (
      username === "" ||
      email === "" ||
      password === "" ||
      passwordConf === ""
    ) {
      setEmptyError(true);
    } else {
      if (!email.includes("@")) {
        setRealEmailError(true);
      } else {
        if (password !== passwordConf) {
          setEqualPassError(true);
        } else {
          axios
            .post("/auth/register", { username, email, password })
            .then((response) => {
              console.log(response);
              dispatch(updateUsername(response.data.username));
              dispatch(updateUserId(response.data.id));
              props.history.push("/dashboard");
            })
            .catch((e) => {
              if (e) {
                setduplicatedUserError(true);
              }
            });
        }
      }
    }
  };

  return (
    <Container className={classes.contenedor}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ height: "80vh" }}
      >
        <Grid item>
          <Card className={classes.card} variant="outlined">
            <Typography
              variant="h5"
              component="h1"
              className={classes.heading}
              color="secondary"
            >
              Create an account
            </Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                className={classes.field}
                name="username"
                variant="outlined"
                label="Username"
                color="secondary"
                required
                onChange={handleUsernameChange}
                error={usernameError}
                // error={usernameError}
                fullWidth
              ></TextField>
              <TextField
                className={classes.field}
                name="email"
                variant="outlined"
                label="Email"
                color="secondary"
                required
                onChange={handleEmailChange}
                error={emailError}
                fullWidth
              ></TextField>
              <TextField
                className={classes.field}
                name="password"
                variant="outlined"
                label="Password"
                color="secondary"
                required
                onChange={handlePasswordChange}
                type="password"
                error={passwordError}
                fullWidth
              ></TextField>
              <TextField
                className={classes.field}
                name="passwordConf"
                variant="outlined"
                label="Confirm Password"
                color="secondary"
                type="password"
                required
                onChange={handlePasswordConfChange}
                error={passwordConfError}
                fullWidth
              ></TextField>
              <Button
                size="large"
                variant="contained"
                disableElevation
                fullWidth
                type="submit"
                color="primary"
                style={{ marginTop: 10, marginBottom: 10 }}
              >
                Register
              </Button>
              <Typography
                style={{ textAlign: "right", fontSize: 14 }}
                color="secondary"
              >
                If you have an account{" "}
                <Link href="/#/login" variant="body2">
                  login here
                </Link>
              </Typography>
            </form>
            {emptyError ? (
              <Alert severity="error" className={classes.error}>
                You must complete all the fields.
              </Alert>
            ) : null}
            {equalPassError ? (
              <Alert severity="error" className={classes.error}>
                Double check your password confirmation.
              </Alert>
            ) : null}
            {realEmailError ? (
              <Alert severity="error" className={classes.error}>
                You need to enter a real email address.
              </Alert>
            ) : null}
            {duplicatedUserError ? (
              <Alert severity="error" className={classes.error}>
                The username is already taken.
              </Alert>
            ) : null}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
