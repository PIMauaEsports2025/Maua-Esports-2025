import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Times from './Components/Times';
import Contato from './Components/Contato';
import LoginRegister from './Components/LoginRegister';
import AdminInterface from './Components/AdminInterface';
import Sobre from './Components/Sobre';
import GerenciarModalidades from './Components/GerenciarModalidades';
import GerenciarMembros from './Components/GerenciarMembros';
import TimeValorantA from './Components/TimeValorantA';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path='/gerenciar-membros' element={<GerenciarMembros />} />
        <Route path="/gerenciar-modalidades" element={<GerenciarModalidades />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/times" element={<Times />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/admin" element={<AdminInterface />} />
        <Route path="/time-valorant-a" element={<TimeValorantA />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;