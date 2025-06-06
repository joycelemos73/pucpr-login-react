import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './LoginForm';

describe('LoginForm Component', () => {
  // Teste 1: Verificar se o componente renderiza corretamente
  test('renders login form with all elements', () => {
    render(<LoginForm />);

    // Verificar o cabeçalho
    expect(screen.getByText('Login')).toBeInTheDocument();

    // Verificar os campos de entrada
    expect(screen.getByPlaceholderText('seu.email@exemplo.com.br')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();

    // Verificar o botão
    expect(screen.getByRole('button', { name: /acessar/i })).toBeInTheDocument();
  });

  // Teste 2: Testar a mudança de entrada do email
  test('updates email state when input changes', () => {
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText('seu.email@exemplo.com.br');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput.value).toBe('test@example.com');
  });

  // Teste 3: Testar a mudança de entrada da senha
  test('updates password state when input changes', () => {
    render(<LoginForm />);

    const passwordInput = screen.getByPlaceholderText('Senha');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(passwordInput.value).toBe('password123');
  });

  // Test 4: Test successful login
  test('shows success message when login is successful', () => {
    render(<LoginForm />);

    // Enter correct credentials
    const emailInput = screen.getByPlaceholderText('seu.email@exemplo.com.br');
    const passwordInput = screen.getByPlaceholderText('Senha');

    fireEvent.change(emailInput, { target: { value: 'joyce.lemos@pucpr.br' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /acessar/i });
    fireEvent.click(submitButton);

    // Check for success message
    expect(screen.getByText('Acessado com sucesso!')).toBeInTheDocument();
    expect(screen.getByText('Acessado com sucesso!').className).toContain('success-message');
  });

  // Test 5: Test failed login
  test('shows error message when login fails', () => {
    render(<LoginForm />);

    // Enter incorrect credentials
    const emailInput = screen.getByPlaceholderText('seu.email@exemplo.com.br');
    const passwordInput = screen.getByPlaceholderText('Senha');

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /acessar/i });
    fireEvent.click(submitButton);

    // Check for error message
    expect(screen.getByText('Usuário ou senha incorretos!')).toBeInTheDocument();
    expect(screen.getByText('Usuário ou senha incorretos!').className).toContain('error-message');
  });
});
