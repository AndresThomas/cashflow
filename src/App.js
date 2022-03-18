import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import Categorias from './pages/categorias';
import Flujo from './pages/flujo';
import Indicadores from './pages/indicadores';
import Reportes from './pages/reportes';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home/>} exact />
        <Route path='/Categorias' element={<Categorias/>} />
        <Route path='/Flujo' element={<Flujo/>} />
        <Route path='/Indicadores' element={<Indicadores/>} />
        <Route path='/Reportes' element={<Reportes/>} />
      </Routes>
    </Router>
  );
}

export default App;
