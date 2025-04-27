import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock the components used in App
jest.mock('./components/LoginPage', () => () => <div data-testid="login-page">Login Page</div>);
jest.mock('./components/RegisterPage', () => () => <div data-testid="register-page">Register Page</div>);
jest.mock('./components/WelcomePage', () => () => <div data-testid="welcome-page">Welcome Page</div>);
jest.mock('./components/ProtectedRoute', () => ({ children }) => <div data-testid="protected-route">{children}</div>);

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }) => <div data-testid="browser-router">{children}</div>,
  Routes: ({ children }) => <div data-testid="routes">{children}</div>,
  Route: ({ element }) => <div data-testid="route">{element}</div>,
  useNavigate: () => jest.fn(),
}));

describe('App Component', () => {
  // Test 1: Check if the App renders the login page by default
  test('renders the login page by default', () => {
    render(<App />);
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  // Test 2: Check if the App renders with router components
  test('renders with router components', () => {
    render(<App />);
    expect(screen.getByTestId('browser-router')).toBeInTheDocument();
    expect(screen.getByTestId('routes')).toBeInTheDocument();
    expect(screen.getAllByTestId('route').length).toBeGreaterThan(0);
  });

  // Test 3: Check if the App renders the login page content
  test('renders the login page content', () => {
    render(<App />);
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
