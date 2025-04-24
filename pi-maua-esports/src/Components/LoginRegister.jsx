import React, {useState} from "react";
import './LoginRegister.css';
import { FaUser, FaLock, FaEnvelope} from "react-icons/fa";

const LoginRegister = () => {
    const [active, setActive] = useState('login');

    // Add wrapper class based on which form is active
    const getWrapperClass = () => {
        if (active === 'register') return 'wrapper active';
        if (active === 'forgot') return 'wrapper forgot-active';
        return 'wrapper';
    };

    const registerLink = (e) => {
        e.preventDefault(); 
        setActive('register');
    };

    const loginLink = (e) => {
        e.preventDefault(); 
        setActive('login');
    };

    const forgotLink = (e) => {
        e.preventDefault();
        setActive('forgot');
    };
    
    return (
        <div className={getWrapperClass()}>
            <div className={`form-box login ${active === 'login' ? 'active' : ''}`}>
                <form action="">
                    <h1>LOGIN</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
                        <FaLock className="icon" />
                    </div>

                    <div className="remember-forgot">
                        <label><input type="checkbox" /> Remember me</label>
                        <a href="#" onClick={forgotLink}>Forgot password?</a>
                    </div>

                    <button type="submit">Login</button>

                    <div className="register-link">
                        <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
                    </div>
                </form>
            </div>

            <div className={`form-box register ${active === 'register' ? 'active' : ''}`}>
                <form action="">
                    <h1>REGISTRATION</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder="Email" required />
                        <FaEnvelope className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
                        <FaLock className="icon" />
                    </div>

                    <div className="remember-forgot">
                        <label><input type="checkbox" />I agree to the terms and conditions</label>
                    </div>

                    <button type="submit">Register</button>

                    <div className="register-link">
                        <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
                    </div>
                </form>
            </div>

            <div className={`form-box forgot ${active === 'forgot' ? 'active' : ''}`}>
                <form action="">
                    <h1>ESQUECEU SENHA?</h1>
                    <p className="forgot-message">Informe seu e-mail no campo abaixo para que possamos enviar um código de verificação e auxiliar na recuperação de sua senha!</p>
                    <div className="input-box">
                        <input type="text" placeholder="Email" required />
                        <FaEnvelope className="icon" />
                    </div>                   
                    <button type="submit">Confirmar Email</button>
                    <div className="register-link">
                        <p><a href="#" onClick={loginLink}>Voltar para Login</a></p>
                    </div>                   
                </form>
            </div>
        </div>
    );
};

export default LoginRegister;