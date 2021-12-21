import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ path, exact, children }) => {
  const auth = useSelector((store) => store.userId);

  return auth ? (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  ) : (
    <Redirect to="/login" />
    // <p>hola</p>
  );
};

export default ProtectedRoute;
