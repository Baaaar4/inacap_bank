// src/components/AppBar.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ResponsiveAppBar from './AppBar';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../authProdiver.jsx';

// Mocking useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('ResponsiveAppBar', () => {
  const logOut = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <AuthContext.Provider value={{ logOut }}>
        <Router>
          <ResponsiveAppBar />
        </Router>
      </AuthContext.Provider>
    );

  test('renders app bar with menu items', () => {
    renderComponent();
    expect(screen.getByText(/Inacap Bank/i)).toBeInTheDocument();
    expect(screen.getByText(/Consultas/i)).toBeInTheDocument();
    expect(screen.getByText(/Transferir/i)).toBeInTheDocument();
    expect(screen.getByText(/Pagos/i)).toBeInTheDocument();
  });

  test('opens and closes the navigation menu', () => {
    renderComponent();
    const menuButton = screen.getByLabelText(/account of current user/i);
    userEvent.click(menuButton);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    userEvent.click(document.body); // Click outside to close menu
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  test('navigates to correct path when menu item is clicked', () => {
    renderComponent();
    userEvent.click(screen.getByText(/Consultas/i));
    expect(mockNavigate).toHaveBeenCalledWith('/consults');

    userEvent.click(screen.getByText(/Transferir/i));
    expect(mockNavigate).toHaveBeenCalledWith('/transfer');

    userEvent.click(screen.getByText(/Pagos/i));
    expect(mockNavigate).toHaveBeenCalledWith('/services');
  });

  test('opens and closes user menu', () => {
    renderComponent();
    const userMenuButton = screen.getByRole('button', { name: /abrir opciones/i });
    userEvent.click(userMenuButton);
    expect(screen.getByText(/Administrar cuenta/i)).toBeInTheDocument();

    userEvent.click(document.body); // Click outside to close menu
    expect(screen.queryByText(/Administrar cuenta/i)).not.toBeInTheDocument();
  });

  test('logs out and navigates to login on logout', () => {
    renderComponent();
    const userMenuButton = screen.getByRole('button', { name: /abrir opciones/i });
    userEvent.click(userMenuButton);
    userEvent.click(screen.getByText(/Cerrar sesión/i));
    expect(logOut).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
