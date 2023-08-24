import React, { useState } from 'react';
import Logo from './../images/logo.png';
import './Register.css';


const Register = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            // Registration successful, proceed with login
            const loginResponse = await fetch('http://127.0.0.1:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const loginData = await loginResponse.json();
            if (loginResponse.ok) {
                onLogin(loginData.access); // Log in user automatically
            }
        }
        console.log('Registration Result:', data.detail);
    };

    return (
        <div className="login-container">
            <img src={Logo} alt="Logo" className="logo" />
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Registro</h2>
                <input type="text" placeholder="Usuário" className="input-field" 
                    value={username} onChange={(e) => setUsername(e.target.value)}
                />
                <input type="password" placeholder="Senha" className="input-field" 
                    value={password} onChange={(e) => setPassword(e.target.value)}    
                />
                <button type="submit" className="submit-button">Criar</button>
                <div class="hint-container">
                    <h2>A sua senha deve cumprir os seguintes requisitos:</h2>
                    <ul>
                        <li> - Ter no mínimo 8 caracteres.</li>
                        <li> - Ter ao menos um caractere especial.</li>
                    </ul>
                </div>
            </form>
        </div>
    );
};

export default Register;
