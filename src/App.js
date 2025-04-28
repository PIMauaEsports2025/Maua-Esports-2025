import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import LoginRegister from './Components/LoginRegister';
import Sobre from './Components/Sobre';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/sobre" element={<Sobre />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;