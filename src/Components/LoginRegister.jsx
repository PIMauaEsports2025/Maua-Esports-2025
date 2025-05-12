import React, { useState } from "react";
import "../styles/LoginRegister.css";
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";

const LoginRegister = () => {
  const [active, setActive] = useState("login");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState("");

  const getWrapperClass = () => {
    if (active === "register") return "wrapper active";
    if (active === "forgot") return "wrapper forgot-active";
    if (active === "reset") return "wrapper reset-active";
    return "wrapper";
  };

  const registerLink = (e) => {
    e.preventDefault();
    setActive("register");
  };

  const loginLink = (e) => {
    e.preventDefault();
    setActive("login");
  };

  const forgotLink = (e) => {
    e.preventDefault();
    setActive("forgot");
  };

  const resetLink = (e) => {
    e.preventDefault();
    setActive("reset");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset confirmed");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    try {
      const username = e.target.username.value;
      const password = e.target.password.value;

      // Solução temporária com múltiplas contas
      if (username === "admin" && password === "admin") {
        localStorage.setItem("token", "admin-token-1234");
        localStorage.setItem("userRole", "admin");
        setTimeout(() => {
          setIsLoading(false);
          window.location.href = "/admin";
        }, 1000);
        return;
      } else if (username === "captain" && password === "captain") {
        localStorage.setItem("token", "captain-token-5678");
        localStorage.setItem("userRole", "captain");
        setTimeout(() => {
          setIsLoading(false);
          window.location.href = "/admin";
        }, 1000);
        return;
      } else if (username === "member" && password === "member") {
        localStorage.setItem("token", "member-token-9012");
        localStorage.setItem("userRole", "member");
        setTimeout(() => {
          setIsLoading(false);
          window.location.href = "/admin";
        }, 1000);
        return;
      }

      // Credenciais inválidas
      setLoginError(
        "Credenciais inválidas. Use admin/admin, captain/captain ou member/member para teste."
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Erro no login:", error);
      setLoginError(
        error.message || "Erro ao fazer login. Verifique suas credenciais."
      );
      setIsLoading(false);
    }
  };

  const validateRA = (ra) => {
    // Formato: XX.XXXXX-X
    const raRegex = /^\d{2}\.\d{5}-\d$/;
    return raRegex.test(ra);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setRegistrationError("");

    try {
      const ra = e.target.ra.value;
      const email = e.target.email.value;
      const password = e.target.password.value;

      // Validar RA
      if (!validateRA(ra)) {
        throw new Error("Formato de RA inválido. Use o formato XX.XXXXX-X");
      }

      // Verificar se o email corresponde ao RA
      const expectedEmail = `${ra}@maua.br`;
      if (email !== expectedEmail) {
        throw new Error(`O email deve ser ${expectedEmail}`);
      }

      // Simulação de registro bem-sucedido
      setTimeout(() => {
        setIsLoading(false);
        setActive("login");
        // Mostrar alguma mensagem de sucesso
      }, 1000);
    } catch (error) {
      console.error("Erro no registro:", error);
      setRegistrationError(
        error.message || "Erro ao registrar. Verifique seus dados."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <button
        className="home-button"
        onClick={() => (window.location.href = "/")}
      >
        {" "}
        ←{" "}
      </button>

      <div className={getWrapperClass()}>
        <div className={`form-box login ${active === "login" ? "active" : ""}`}>
          <form onSubmit={handleLogin}>
            <h1>LOGIN</h1>

            {loginError && <div className="error-message">{loginError}</div>}

            <div className="input-box">
              <input
                type="text"
                name="username"
                placeholder="Usuário"
                required
              />
              <FaUser className="icon" />
            </div>

            <div className="input-box">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Senha"
                required
              />
              <FaLock className="icon" />
              <button
                type="button"
                className="visibility-toggle"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="remember-forgot">
              <label>
                <input type="checkbox" name="remember" /> Lembre-me
              </label>
              <a href="#" onClick={forgotLink}>
                Esqueceu senha?
              </a>
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Carregando..." : "Login"}
            </button>

            <div className="register-link">
              <p>
                Ainda não tem uma conta?{" "}
                <a href="#" onClick={registerLink}>
                  Cadastre-se
                </a>
              </p>
            </div>

            <div className="login-options">
              <div className="divider">
                <span>ou acesse rapidamente</span>
              </div>

              <div className="auth-buttons">
                <button type="button" className="auth-button microsoft">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                    alt="Microsoft logo"
                    className="auth-icon"
                  />
                  <span>Microsoft</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        <div
          className={`form-box register ${
            active === "register" ? "active" : ""
          }`}
        >
          <form onSubmit={handleRegister}>
            <h1>CADASTRO</h1>

            {registrationError && (
              <div className="error-message">{registrationError}</div>
            )}

            <div className="input-box">
              <input
                type="text"
                name="ra"
                placeholder="RA (xx.xxxxx-x)"
                required
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input type="email" name="email" placeholder="Email" required />
              <FaEnvelope className="icon" />
            </div>
            <div className="input-box">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Senha"
                required
              />
              <FaLock className="icon" />
              <button
                type="button"
                className="visibility-toggle"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="remember-forgot">
              <label>
                <input type="checkbox" /> Concordo com os termos e condições
              </label>
            </div>

            <button type="submit">Cadastrar</button>

            <div className="register-link">
              <p>
                Já tem uma conta?{" "}
                <a href="#" onClick={loginLink}>
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>

        <div
          className={`form-box forgot ${active === "forgot" ? "active" : ""}`}
        >
          <form action="">
            <h1>ESQUECEU SENHA?</h1>
            <p className="forgot-message">
              Informe seu e-mail no campo abaixo para que possamos enviar um
              código de verificação e auxiliar na recuperação de sua senha!
            </p>
            <div className="input-box">
              <input type="text" placeholder="Email" required />
              <FaEnvelope className="icon" />
            </div>
            <button type="submit" onClick={resetLink}>
              Confirmar Email
            </button>
            <div className="register-link">
              <p>
                <a href="#" onClick={loginLink}>
                  Voltar para Login
                </a>
              </p>
            </div>
          </form>
        </div>

        <div className={`form-box reset ${active === "reset" ? "active" : ""}`}>
          <form onSubmit={handleResetSubmit}>
            <h1>NOVA SENHA</h1>
            <p className="reset-message">
              Digite sua nova senha nos campos abaixo e confirme para concluir a
              alteração. Certifique-se de escolher uma senha segura e fácil de
              lembrar.
            </p>

            <div className="input-box">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Nova senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FaLock className="icon" />
              <button
                type="button"
                className="visibility-toggle"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="input-box">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirme a nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <FaLock className="icon" />
              <button
                type="button"
                className="visibility-toggle"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button type="submit" className="confirm-button">
              CONFIRMAR SENHA
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
