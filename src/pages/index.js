import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
const Home = () => {
  const { isAuthenticated,user } = useAuth0();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh'
      }}
    >
      {isAuthenticated ? (
          <h1>Bienvenido {user.name} </h1>
        ) : (
          <h1>Inicie sesion para utilizar CashFlow</h1>
        )}
      
    </div>
  );
};

export default Home;
