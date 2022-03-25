import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import CategoriasView from "./pages/categorias";
import Flujo from "./pages/flujo";
import Indicadores from "./pages/indicadores";
import Reportes from "./pages/reportes";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        {isAuthenticated ? (
          <Route exact path="/categorias" element={<CategoriasView />} />
        ) : (
          <Route exact path="/" element={<Home />} />
        )}
        {isAuthenticated ? (
          <Route exact path="/flujo" element={<Flujo />} />
        ) : (
          <Route exact path="/" element={<Home />} />
        )}
        {isAuthenticated ? (
          <Route exact path="/indicadores" element={<Indicadores />} />
        ) : (
          <Route exact path="/" element={<Home />} />
        )}
        {isAuthenticated ? (
          <Route exact path="/reportes" element={<Reportes />} />
        ) : (
          <Route exact path="/" element={<Home />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
