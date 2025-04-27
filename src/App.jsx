// Arquivo: App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import WelcomePage from './components/WelcomePage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <Router>
            <div className="App">
                <div className="app-container">
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route 
                            path="/welcome" 
                            element={
                                <ProtectedRoute>
                                    <WelcomePage />
                                </ProtectedRoute>
                            } 
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
