import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div>
      <p>{JSON.stringify(user, null, 2)}</p>
      {isAuthenticated ? "Si esta logueado" : "no esta logueado"}
    </div>
  );
};

export default Profile;
