// Arquivo: index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Verificamos se o elemento 'root' existe
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Falha ao encontrar o elemento root');

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
