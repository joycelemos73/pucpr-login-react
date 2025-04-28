import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;

                if (!user) {
                    // Se nenhum usuário estiver logado, redirecionar para a página de login
                    navigate('/');
                    return;
                }

                // Buscar dados do usuário no Firestore
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                } else {
                    setError('Dados do usuário não encontrados');
                }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
                setError('Falha ao carregar dados do usuário');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Erro ao sair da conta:', error);
            setError('Falha ao sair da conta');
        }
    };

    if (loading) {
        return (
            <div className="login-container">
                <h1 className="login-heading">Carregando...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="login-container">
                <h1 className="login-heading">Erro</h1>
                <div className="error-message">{error}</div>
                <button className="form-button" onClick={() => navigate('/')}>
                    Voltar para o Login
                </button>
            </div>
        );
    }

    return (
        <div className="login-container">
            <h1 className="login-heading">Bem-vindo</h1>

            {userData && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <p>Nome: {userData.nome}</p>
                    <p>Sobrenome: {userData.sobrenome}</p>
                </div>
            )}

            <button className="form-button" onClick={handleLogout}>
                Sair
            </button>
        </div>
    );
};

export default WelcomePage;
