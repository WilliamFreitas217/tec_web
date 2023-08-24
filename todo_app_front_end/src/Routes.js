import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import Home from './Home';

const AppRoutes = ({ onLogin }) => {
    return (
        <div>
            {/* <Login /> */}
            <nav>
                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                </ul>
            </nav>

            <Routes>
                <Route path="/login" element={<Login onLogin={onLogin} />} />
                <Route path="/register" element={<Register onLogin={onLogin} />} />
                <Route path="/home" element={<Home onLogin={onLogin} />} />
            </Routes>
        </div>
    );
};

export default AppRoutes;
