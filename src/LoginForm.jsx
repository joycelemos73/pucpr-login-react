// Arquivo: LoginForm.jsx
import { useState } from 'react';

const LoginForm = () => {
    // Estado para os campos do formulário
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    // Dados de usuário simulados
    const mockUserData = {
        email: 'joyce.lemos@pucpr.br',
        password: '123456'
    };

    // Manipuladores de eventos
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Manipulador de envio de formulário
    const handleAccess = (e) => {
        e.preventDefault();

        // Validar credenciais
        if (email === mockUserData.email && password === mockUserData.password) {
            setMessage('Acessado com sucesso!');
            setMessageType('success');
        } else {
            setMessage('Usuário ou senha incorretos!');
            setMessageType('error');
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-heading">Login</h1>

            <form className="form-full-width" onSubmit={handleAccess}>
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
                >
                    Acessar
                </button>
            </form>

            {message && (
                <div className={`message ${messageType === 'success' ? 'success-message' : 'error-message'}`}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default LoginForm;
