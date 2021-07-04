import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  return (
    <div>
      <h1>Login component</h1>
      <form>
        <label>
          Username:
          <input />
        </label>
        <label>
          Password:
          <input />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
