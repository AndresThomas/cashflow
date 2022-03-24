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
        <Route path="/" element={<Home />} exact />
        {isAuthenticated ? (
          <Route path="/categorias" element={<CategoriasView />} exact/>
        ) : (
          <Route path="/" element={<Home />} exact />
        )}
        {isAuthenticated ? (
          <Route path="/flujo" element={<Flujo />} />
        ) : (
          <Route path="/" element={<Home />} exact />
        )}
        {isAuthenticated ? (
          <Route path="/indicadores" element={<Indicadores />} />
        ) : (
          <Route path="/" element={<Home />} exact />
        )}
        {isAuthenticated ? (
          <Route path="/reportes" element={<Reportes />} />
        ) : (
          <Route path="/" element={<Home />} exact />
        )}
      </Routes>
    </Router>
  );
}

export default App;
