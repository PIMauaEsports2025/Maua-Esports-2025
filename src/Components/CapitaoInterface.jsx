import { useNavigate } from "react-router-dom";
import "../styles/AdminInterface.css";
import HeaderAdmin from "./Layout/HeaderAdmin.jsx";

import {
  FaUsers,
  FaClock,
  FaCalendarAlt,
  FaChevronRight,
  FaChartBar,
} from "react-icons/fa";
import Footer from "./Layout/Footer";

const CapitaoInterface = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <HeaderAdmin />

      <main className="main-panel">
        <div className="button-panel">
          <div className="admin-greeting">
            <h2>Painel do Capitão</h2>
            <p>Gerencie sua equipe e treinos</p>
          </div>

          <button
            className="main-button"
            onClick={() => navigate("/gerenciar-membros-equipe")}
          >
            <FaUsers />
            <span className="button-text">MEMBROS DA EQUIPE</span>
            <FaChevronRight />
          </button>

          <button
            className="main-button"
            onClick={() => navigate("/capitao/horas-pae")}
          >
            <FaClock />
            <span className="button-text">HORAS PAE</span>
            <FaChevronRight />
          </button>

          <button
            className="main-button"
            onClick={() => navigate("/capitao/treinos-equipe")}
          >
            <FaCalendarAlt />
            <span className="button-text">TREINOS</span>
            <FaChevronRight />
          </button>
          <button
            className="main-button"
            onClick={() => navigate("/dashboard-capitao")}
          >
            <FaChartBar />
            <span className="button-text">DASHBOARD</span>
            <FaChevronRight />
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CapitaoInterface;
