// Arquivo: LoginForm.tsx
import { useState, FormEvent, ChangeEvent } from 'react';

// Define a interface para credenciais de usuário
interface UserCredentials {
    email: string;
    password: string;
}

// Define os tipos de mensagem para clareza
type MessageType = 'success' | 'error' | '';

const LoginForm: React.FC = () => {
    // Estado com anotações de tipo adequadas
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<MessageType>('');

    // Dados de usuário simulados
    const mockUserData: UserCredentials = {
        email: 'eduardo.lino@pucpr.br',
        password: '123456'
    };

    // Manipuladores de eventos com tipagem adequada
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    };

    // Manipulador de envio de formulário com tipagem adequada
    const handleAccess = (e: FormEvent<HTMLFormElement>): void => {
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
