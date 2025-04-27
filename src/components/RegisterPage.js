import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
    // State for form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
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

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    // Form submission handler
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store additional user data in Firestore
            await setDoc(doc(db, "users", user.uid), {
                nome: firstName,
                sobrenome: lastName,
                email: email
            });

            setMessage('Registration successful! Redirecting to login...');
            setMessageType('success');
            
            // Redirect to login page after successful registration
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Registration error:', error);
            let errorMessage = 'Registration failed. Please try again.';
            
            // Handle specific Firebase errors
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'This email is already registered.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password is too weak. Please use a stronger password.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address.';
            }
            
            setMessage(errorMessage);
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-heading">Register</h1>

            <form className="form-full-width" onSubmit={handleRegister}>
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

                <div className="form-group">
                    <input
                        type="text"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        placeholder="First Name"
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        value={lastName}
                        onChange={handleLastNameChange}
                        placeholder="Last Name"
                        className="form-input"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="form-button"
                    disabled={loading}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>

            {message && (
                <div className={`message ${messageType === 'success' ? 'success-message' : 'error-message'}`}>
                    {message}
                </div>
            )}
            
            <div style={{ marginTop: '1rem' }}>
                Already have an account? <Link to="/">Login here</Link>
            </div>
        </div>
    );
};

export default RegisterPage;
