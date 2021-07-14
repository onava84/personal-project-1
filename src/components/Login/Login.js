import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUsername, updateUserId } from "../../redux/reducer";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// const Login = (props) => {
//   const [authInfo, setAuthInfo] = useState({ username: "", password: "" });
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setAuthInfo({
//       ...authInfo,
//       [e.target.name]: e.target.value,
//     });
//     console.log(authInfo);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post("/auth/login", authInfo).then((response) => {
//       dispatch(updateUsername(response.data.username));
//       dispatch(updateUserId(response.data.id));
//       props.history.push("/dashboard");
//     });
//   };

//   return (
//     <div>
//       <h1>Login component</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Username:
//           <input name="username" onChange={handleChange} />
//         </label>
//         <label>
//           Password:
//           <input type="password" name="password" onChange={handleChange} />
//         </label>
//         <button>Submit</button>
//       </form>
//     </div>
//   );
// };

const Login = (props) => {
  const [authInfo, setAuthInfo] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // const handleChange = (e) => {
  //   setAuthInfo({
  //     ...authInfo,
  //     [e.target.name]: e.target.value,
  //   });
  //   console.log(authInfo);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios.post("/auth/login", authInfo).then((response) => {
  //     dispatch(updateUsername(response.data.username));
  //     dispatch(updateUserId(response.data.id));
  //     props.history.push("/dashboard");
  //   });
  // };

  const handleChange = (e) => {
    setAuthInfo({
      ...authInfo,
      [e.target.name]: e.target.value,
    });
    console.log(authInfo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsernameError(false);
    setPasswordError(false);
    if (authInfo.username == "") {
      setUsernameError(true);
    }
    if (authInfo.password == "") {
      setPasswordError(true);
    }
    if (authInfo.username && authInfo.password) {
      console.log(authInfo.username, authInfo.password);
      axios.post("/auth/login", authInfo).then((response) => {
        dispatch(updateUsername(response.data.username));
        dispatch(updateUserId(response.data.id));
        props.history.push("/dashboard");
      });
    }
  };

  return (
    <div>
      <h1>Login component</h1>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          name="username"
          variant="outlined"
          label="Username"
          required
          onChange={handleChange}
          error={usernameError}
        ></TextField>
        <TextField
          type="password"
          name="password"
          variant="outlined"
          label="Password"
          required
          onChange={handleChange}
          error={passwordError}
        ></TextField>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          onClick={console.log(authInfo)}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
