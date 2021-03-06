import React from "react";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    isAuthenticated && (
      
        <h5 className="userinfo"> {user.name}</h5>
      
    )
  );
};
