import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import "./CreateTournament.css";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  // const [showError, setShowError] = useState(false);
  const [emptyError, setEmptyError] = useState("");
  const [equalPassError, setEqualPassError] = useState("");
  const [duplicatedUserError, setduplicatedUserError] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePasswordConfChange = (e) => setPasswordConf(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      passwordConf === ""
    ) {
      setEmptyError("Please fill all the fields..");
    } else {
      if (password !== passwordConf) {
        setEqualPassError("Confirm that you repeat the password");
      } else {
        axios
          .post("/auth/register", { username, email, password })
          .then((response) => {
            console.log(response);

            props.history.push("/login");
          })
          .catch((e) => {
            if (e) {
              setduplicatedUserError("The user is already taken");
            }
          });
      }
    }
  };

  return (
    <div>
      <h1>Register component</h1>
      {emptyError !== "" ? <p>{emptyError}</p> : null}
      {equalPassError !== "" ? <p>{equalPassError}</p> : null}
      {duplicatedUserError !== "" ? <p>{duplicatedUserError}</p> : null}
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input onChange={handleUsernameChange} />
        </label>
        <label>
          Email
          <input onChange={handleEmailChange} />
        </label>
        <label>
          Password
          <input type="password" onChange={handlePasswordChange} />
        </label>
        <label>
          Confirm Password
          <input type="password" onChange={handlePasswordConfChange} />
        </label>
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;

// const Register = (props) => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordConf, setPasswordConf] = useState("");
//   const [showError, setShowError] = useState(false);
//   const [error, setError] = useState("");

//   const handleUsernameChange = (e) => setUsername(e.target.value);
//   const handleEmailChange = (e) => setEmail(e.target.value);
//   const handlePasswordChange = (e) => setPassword(e.target.value);
//   const handlePasswordConfChange = (e) => setPasswordConf(e.target.value);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (
//       (username === "" ||
//         email === "" ||
//         password === "" ||
//         passwordConf === "") &&
//       password === passwordConf
//     ) {
//       setShowError(true);
//     } else {
//       axios
//         .post("/auth/register", { username, email, password })
//         .then((response) => {
//           console.log(response);
//           // props.history.push('/new');
//         });
//     }
//   };

//   return (
//     <div>
//       <h1>Register component</h1>
//       {showError ? <p>Please complete all the fields</p> : null}
//       <form onSubmit={handleSubmit}>
//         <label>
//           Username
//           <input onChange={handleUsernameChange} />
//         </label>
//         <label>
//           Email
//           <input onChange={handleEmailChange} />
//         </label>
//         <label>
//           Password
//           <input type="password" onChange={handlePasswordChange} />
//         </label>
//         <label>
//           Confirm Password
//           <input type="password" onChange={handlePasswordConfChange} />
//         </label>
//         <button>Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;
