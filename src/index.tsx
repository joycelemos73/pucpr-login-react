// Arquivo: index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Asserção de tipo para getElementById já que sabemos que 'root' existe
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Falha ao encontrar o elemento root');

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
