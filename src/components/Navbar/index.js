import React from "react";
import "./style.css";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
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
        
          <NavLink to="/">
          <Profile />
          </NavLink>
        
        <Bars />
        <NavMenu>
        {/*  activeStyle*/}
          {isAuthenticated ? (
            <NavLink to="/categorias" >
              Categorias
            </NavLink>
          ) : (
            <NavLink to="/" > Categorias </NavLink>
          )}
          {isAuthenticated ? (
            <NavLink to="/indicadores" >
              Indicadores
            </NavLink>
          ) : (
            <NavLink to="/" > Indicadores </NavLink>
          )}
          {isAuthenticated ? (
            <NavLink to="/flujo" >
              Flujo efectivo
            </NavLink>
          ) : (
            <NavLink to="/" > Flujo efectivo </NavLink>
          )}
          {isAuthenticated ? (
            <NavLink to="/reportes" >
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
