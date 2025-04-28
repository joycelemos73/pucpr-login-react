import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
    // Estado para os campos do formulário
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Manipuladores de eventos
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    // Manipulador de envio do formulário
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Criar usuário na Autenticação do Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Armazenar dados adicionais do usuário no Firestore
            await setDoc(doc(db, "users", user.uid), {
                nome: firstName,
                sobrenome: lastName,
                email: email
            });

            setMessage('Registro realizado com sucesso! Redirecionando para o login...');
            setMessageType('success');

            // Redirecionar para a página de login após o registro bem-sucedido
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Erro de registro:', error);
            let errorMessage = 'Falha no registro. Por favor, tente novamente.';

            // Tratar erros específicos do Firebase
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Este email já está registrado.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Senha muito fraca. Por favor, use uma senha mais forte.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Endereço de email inválido.';
            }

            setMessage(errorMessage);
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-heading">Registro</h1>

            <form className="form-full-width" onSubmit={handleRegister}>
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

                <div className="form-group">
                    <input
                        type="text"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        placeholder="Nome"
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        value={lastName}
                        onChange={handleLastNameChange}
                        placeholder="Sobrenome"
                        className="form-input"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="form-button"
                    disabled={loading}
                >
                    {loading ? 'Registrando...' : 'Registrar'}
                </button>
            </form>

            {message && (
                <div className={`message ${messageType === 'success' ? 'success-message' : 'error-message'}`}>
                    {message}
                </div>
            )}

            <div style={{ marginTop: '1rem' }}>
                Já tem uma conta? <Link to="/">Faça login aqui</Link>
            </div>
        </div>
    );
};

export default RegisterPage;
