import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    // State for form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    // Event handlers
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Form submission handler
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Authenticate with Firebase
            await signInWithEmailAndPassword(auth, email, password);
            setMessage('Login successful!');
            setMessageType('success');
            
            // Redirect to welcome page after successful login
            setTimeout(() => {
                navigate('/welcome');
            }, 1000);
        } catch (error) {
            console.error('Login error:', error);
            setMessage('Invalid email or password. Please try again.');
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
                        placeholder="your.email@example.com"
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Password"
                        className="form-input"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="form-button"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            {message && (
                <div className={`message ${messageType === 'success' ? 'success-message' : 'error-message'}`}>
                    {message}
                </div>
            )}
            
            <div style={{ marginTop: '1rem' }}>
                Don't have an account? <Link to="/register">Register here</Link>
            </div>
        </div>
    );
};

export default LoginPage;
