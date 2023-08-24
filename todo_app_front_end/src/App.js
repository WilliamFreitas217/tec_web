import React, { useState } from 'react';
import './App.css';
import Home from './Home';
import Routes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
    const [token, setToken] = useState('');

    const handleLogin = (newToken) => {
        setToken(newToken);
    };


    return (
        <Router>
            <div className="App">
                <Home token={token} />

                {/* {token ? (
                    <Home token={token} />
                ) : (
                    <Routes onLogin={handleLogin} />
                )}  */}
            </div> 
        </Router>
    );
}

export default App;
