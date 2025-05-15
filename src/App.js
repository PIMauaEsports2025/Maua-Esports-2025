import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Contato from "./Components/Contato";
import LoginRegister from "./Components/LoginRegister";
import AdminInterface from "./Components/AdminInterface";
import Sobre from "./Components/Sobre";
import Times from "./Components/Times";
import Campeonato from "./Components/Campeonato";
import GerenciarModalidades from "./Components/GerenciarModalidades";
import GerenciarTreinos from "./Components/GerenciarTreinos";
import GerenciarMembros from "./Components/GerenciarMembros";
import TimeCs from "./Components/TimeCs";
import TimeEaFc from "./Components/TimeEaFc";
import TimeLol from "./Components/TimeLol";
import TimeRocketLeague from "./Components/TimeRocket";
import TimeTft from "./Components/TimeTft";
import TimeRainbow from "./Components/TimeRainbow";
import TimeValorantBlue from "./Components/TimeValorantBlue";
import TimeValorantPurple from "./Components/TimeValorantPurple";
import TimeValorantWhite from "./Components/TimeValorantWhite";
import ConsultaHorasPAE from "./Components/ConsultaHorasPAE";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/gerenciar-membros" element={<GerenciarMembros />} />
        <Route path="/gerenciar-modalidades" element={<GerenciarModalidades />} />
        <Route path="/gerenciar-treinos" element={<GerenciarTreinos />} />

        <Route path="/sobre" element={<Sobre />} />
        <Route path="/times" element={<Times />} />
        <Route path="/campeonatos" element={<Campeonato />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/admin" element={<AdminInterface />} />
        <Route path="/time-cs" element={<TimeCs />} />
        <Route path="/time-ea-fc" element={<TimeEaFc />} />
        <Route path="/time-league-of-legends" element={<TimeLol />} />
        <Route path="/time-rocket-league" element={<TimeRocketLeague />} />
        <Route path="/time-tft" element={<TimeTft />} />
        <Route path="/time-rainbow-six" element={<TimeRainbow />} />
        <Route path="/time-valorant-blue" element={<TimeValorantBlue />} />
        <Route path="/time-valorant-purple" element={<TimeValorantPurple />} />
        <Route path="/time-valorant-white" element={<TimeValorantWhite />} />
        <Route path="/consulta-horas-pae" element={<ConsultaHorasPAE />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
