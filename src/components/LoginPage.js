import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    // Estado para os campos do formulário
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Manipuladores de eventos para os campos do formulário
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Manipulador de envio do formulário
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Autenticar com o Firebase
            await signInWithEmailAndPassword(auth, email, password);
            setMessage('Login realizado com sucesso!');
            setMessageType('success');

            // Redirecionar para a página de boas-vindas após login bem-sucedido
            setTimeout(() => {
                navigate('/welcome');
            }, 1000);
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            setMessage('Email ou senha inválidos. Por favor, tente novamente.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-heading">Login</h1>

            <form className="form-full-width" onSubmit={handleLogin}>
                <div className="form-group">
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="seu.email@exemplo.com.br"
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Senha"
                        className="form-input"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="form-button"
                    disabled={loading}
                >
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>

            {message && (
                <div className={`message ${messageType === 'success' ? 'success-message' : 'error-message'}`}>
                    {message}
                </div>
            )}

            <div style={{ marginTop: '1rem' }}>
                Não tem uma conta? <Link to="/register">Registre-se aqui</Link>
            </div>
        </div>
    );
};

export default LoginPage;
