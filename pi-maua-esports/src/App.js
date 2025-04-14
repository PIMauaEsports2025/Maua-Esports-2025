import './App.css';
import logo from './assets/maua-branco.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="Logo do site" />
        <h1>Meu Site</h1>
        <nav>
          <a href="#home">Início</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <main className="App-main">
        <section id="home">
          <h2>Bem-vindo!</h2>
          <p>Esse é um exemplo de site simples com React e um logo no topo.</p>
        </section>

        <section id="sobre">
          <h2>Sobre</h2>
          <p>Esse site foi feito como exemplo para aprender React.</p>
        </section>

        <section id="contato">
          <h2>Contato</h2>
          <p>Email: exemplo@meusite.com</p>
        </section>
      </main>

      <footer className="App-footer">
        <p>&copy; 2025 Meu Site. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;