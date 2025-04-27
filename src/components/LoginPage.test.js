import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Mock the firebase auth
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  getAuth: jest.fn(() => ({})),
}));

// Mock the firebase module
jest.mock('../firebase/firebase', () => ({
  auth: {},
  db: {},
}));

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Helper function to render with router
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('LoginPage Component', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Check if the component renders correctly
  test('renders login page with all elements', () => {
    renderWithRouter(<LoginPage />);

    // Check for heading
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();

    // Check for input fields
    expect(screen.getByPlaceholderText('seu.email@exemplo.com.br')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();

    // Check for button
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();

    // Check for registration link
    expect(screen.getByText('Registre-se aqui')).toBeInTheDocument();
  });

  // Test 2: Test email input change
  test('updates email state when input changes', () => {
    renderWithRouter(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('seu.email@exemplo.com.br');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput.value).toBe('test@example.com');
  });

  // Test 3: Test password input change
  test('updates password state when input changes', () => {
    renderWithRouter(<LoginPage />);

    const passwordInput = screen.getByPlaceholderText('Senha');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(passwordInput.value).toBe('password123');
  });

  // Test 4: Test successful login
  test('shows success message when login is successful', async () => {
    // Mock successful authentication
    signInWithEmailAndPassword.mockResolvedValueOnce({});

    renderWithRouter(<LoginPage />);

    // Enter credentials
    const emailInput = screen.getByPlaceholderText('seu.email@exemplo.com.br');
    const passwordInput = screen.getByPlaceholderText('Senha');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    fireEvent.click(submitButton);

    // Check for success message
    await waitFor(() => {
      expect(screen.getByText('Login realizado com sucesso!')).toBeInTheDocument();
    });

    // Check message styling
    expect(screen.getByText('Login realizado com sucesso!').className).toContain('success-message');

    // Verify Firebase auth was called with correct parameters
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      'test@example.com',
      'password123'
    );
  });

  // Test 5: Test failed login
  test('shows error message when login fails', async () => {
    // Mock failed authentication
    signInWithEmailAndPassword.mockRejectedValueOnce(new Error('Auth failed'));

    renderWithRouter(<LoginPage />);

    // Enter credentials
    const emailInput = screen.getByPlaceholderText('seu.email@exemplo.com.br');
    const passwordInput = screen.getByPlaceholderText('Senha');

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    fireEvent.click(submitButton);

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText('Email ou senha inválidos. Por favor, tente novamente.')).toBeInTheDocument();
    });

    // Check message styling
    expect(screen.getByText('Email ou senha inválidos. Por favor, tente novamente.').className).toContain('error-message');

    // Verify Firebase auth was called with correct parameters
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      'wrong@example.com',
      'wrongpassword'
    );
  });

  // Test 6: Test loading state during login
  test('shows loading state during login process', async () => {
    // Mock authentication with delay to observe loading state
    signInWithEmailAndPassword.mockImplementationOnce(() => {
      return new Promise(resolve => {
        setTimeout(() => resolve({}), 100);
      });
    });

    renderWithRouter(<LoginPage />);

    // Enter credentials
    const emailInput = screen.getByPlaceholderText('seu.email@exemplo.com.br');
    const passwordInput = screen.getByPlaceholderText('Senha');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    fireEvent.click(submitButton);

    // Check for loading state
    expect(screen.getByText('Entrando...')).toBeInTheDocument();

    // Wait for login to complete
    await waitFor(() => {
      expect(screen.getByText('Login realizado com sucesso!')).toBeInTheDocument();
    });
  });
});
