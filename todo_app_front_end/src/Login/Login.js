import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './../images/logo.png';
import './Login.css';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        console.log('Token:', data.access);
        // Check if the response contains the 'access' token
        if (data.access) {
            onLogin(data.access);
        }
    };

    return (
        <div className="login-container">
            <img src={Logo} alt="Logo" className="logo" />
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <input type="text" placeholder="Usuário" className="input-field" 
                    value={username} onChange={(e) => setUsername(e.target.value)}
                />
                <input type="password" placeholder="Senha" className="input-field" 
                    value={password} onChange={(e) => setPassword(e.target.value)}    
                />
                <button type="submit" className="submit-button">Login</button>
                <div class="hint-container">
                    <h2>Dica de Senha:</h2>
                    <ul>
                        <li> - Ter no mínimo 8 caracteres.</li>
                        <li> - Ter ao menos um caractere especial.</li>
                    </ul>
                </div>
            </form>
            <p>Não tem uma conta? <Link to="/register">Registre aqui</Link></p>
        </div>
    );  
};

export default Login;
