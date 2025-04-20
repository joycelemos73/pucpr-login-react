
// Arquivo: App.tsx
import React from 'react';
import './App.css';
import LoginForm from "./LoginForm";


const App: React.FC = () => {
    return (
        <div className="App">
            <div className="app-container">
                <LoginForm />
            </div>
        </div>
    );
};


export default App;
