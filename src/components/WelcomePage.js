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
                    // If no user is logged in, redirect to login page
                    navigate('/');
                    return;
                }
                
                // Fetch user data from Firestore
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);
                
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                } else {
                    setError('User data not found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to load user data');
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
            console.error('Logout error:', error);
            setError('Failed to log out');
        }
    };

    if (loading) {
        return (
            <div className="login-container">
                <h1 className="login-heading">Loading...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="login-container">
                <h1 className="login-heading">Error</h1>
                <div className="error-message">{error}</div>
                <button className="form-button" onClick={() => navigate('/')}>
                    Back to Login
                </button>
            </div>
        );
    }

    return (
        <div className="login-container">
            <h1 className="login-heading">Bem vindo</h1>
            
            {userData && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <p>Nome: {userData.nome}</p>
                    <p>Sobrenome: {userData.sobrenome}</p>
                </div>
            )}
            
            <button className="form-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default WelcomePage;
