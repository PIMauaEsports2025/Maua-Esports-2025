import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './App.css';
import logo from './assets/maua-branco.png';
import { ArrowRightCircle } from 'react-bootstrap-icons';

function App() {
  return (
    <div className="App">
      {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} className="custom-navbar" sticky="top">
          <Container fluid className="d-flex justify-content-between align-items-center">
            {/* Logo e título à esquerda */}
            <div className="d-flex align-items-center">
              <img src={logo} alt="Logo" className="navbar-logo" />
              <span className="navbar-title ms-2">E-SPORTS</span>
            </div>

            {/* Toggle para mobile */}
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />

            {/* Menu (offcanvas em mobile, inline no desktop) */}
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className="custom-offcanvas"
            >
              <Offcanvas.Body>
                <Nav className="ms-auto d-flex align-items-center justify-content-end flex-wrap navbar-nav">
                  <Nav.Link href="#home">HOME</Nav.Link>
                  <Nav.Link href="#sobre">SOBRE</Nav.Link>
                  <Nav.Link href="#times">TIMES</Nav.Link>
                  <Nav.Link href="#loja">LOJA</Nav.Link>
                  <Nav.Link href="#campeonatos">CAMPEONATOS</Nav.Link>
                  <Nav.Link href="#login" className="login-icon">
                    <ArrowRightCircle size={24} />
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  );
}

export default App;