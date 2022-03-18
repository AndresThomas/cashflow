import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './components/Navbar/style.css';

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="btn" onClick={() => loginWithRedirect()}>Login</button>;
};
