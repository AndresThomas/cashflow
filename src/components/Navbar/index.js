import React from "react";
import "./style.css";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";
import { LoginButton } from "../../Login";
import { LogoutButton } from "../../Logout";
import { Profile } from "../../Profile";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <Nav>
        <NavLink to="/">
          <img
            className="icon"
            src={require("../../images/logo.png")}
            alt="logo"
          />
        </NavLink>
        <h1>
          <Profile />
        </h1>
        <Bars />
        <NavMenu>
          {isAuthenticated ? (
            <NavLink to="/Categorias" activeStyle>
              Categorias
            </NavLink>
          ) : (
            <NavLink to="/" > Categorias </NavLink>
          )}
          {isAuthenticated ? (
            <NavLink to="/Indicadores" activeStyle>
              Indicadores
            </NavLink>
          ) : (
            <NavLink to="/" > Indicadores </NavLink>
          )}
          {isAuthenticated ? (
            <NavLink to="/Flujo" activeStyle>
              Flujo efectivo
            </NavLink>
          ) : (
            <NavLink to="/" > Flujo efectivo </NavLink>
          )}
          {isAuthenticated ? (
            <NavLink to="/reportes" activeStyle>
              reportes
            </NavLink>
          ) : (
            <NavLink to="/" > Reportes </NavLink>
          )}
        </NavMenu>
        <NavBtn>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
