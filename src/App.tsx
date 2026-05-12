import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Agrega BrowserRouter aquí
import { GlobalStyle } from './styles/main.styles'; // El archivo de estilos globales
import  Navbar  from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import CountryDetails from './pages/CountryDetails';

function App() {
  return (
    <>
      <GlobalStyle /> 
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/country/:id" element={<CountryDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;