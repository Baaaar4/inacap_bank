// src/AuthProvider.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthProvider, { AuthContext } from './AuthProvider';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { getDatabase, ref, set, update } from 'firebase/database';

// Mock de Firebase Auth y Database
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn()
}));

jest.mock('firebase/database', () => ({
  getDatabase: jest.fn(),
  ref: jest.fn(),
  set: jest.fn(),
  update: jest.fn()
}));

const TestComponent = () => {
  const { createUser, loginUser, logOut, user, loading, error } = React.useContext(AuthContext);

  return (
    <div>
      <button onClick={() => createUser('test@example.com', 'password123', { name: 'Test User' })}>Create User</button>
      <button onClick={() => loginUser('test@example.com', 'password123')}>Login User</button>
      <button onClick={() => logOut()}>Logout User</button>
      <div>User: {user ? user.email : 'No user logged in'}</div>
      <div>Loading: {loading ? 'Loading...' : 'Not loading'}</div>
      <div>Error: {error}</div>
    </div>
  );
};

describe('AuthProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('creates a new user', async () => {
    createUserWithEmailAndPassword.mockResolvedValueOnce({ user: { uid: '123', email: 'test@example.com' } });
    set.mockResolvedValueOnce();
    update.mockResolvedValueOnce();

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Create User'));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'test@example.com', 'password123');
      expect(set).toHaveBeenCalledWith(expect.anything(), { name: 'Test User' });
      expect(update).toHaveBeenCalled();
    });
  });

  test('logs in a user', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce({ user: { uid: '123', email: 'test@example.com' } });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Login User'));

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'test@example.com', 'password123');
      expect(screen.getByText('User: test@example.com')).toBeInTheDocument();
    });
  });

  test('logs out a user', async () => {
    signOut.mockResolvedValueOnce();

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Logout User'));

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
      expect(screen.getByText('User: No user logged in')).toBeInTheDocument();
    });
  });
});
