import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import studentsService from '../services/students';


const AuthContext = createContext();

const restoreUserFromLocalStorage = () => {
  const user = localStorage.getItem('current-user');
  if (user) {
    return JSON.parse(user);
  } else {
    return undefined;
  }
}

function AuthStore({ children }) {
  const [user, setUser] = useState(restoreUserFromLocalStorage());
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      if (user) {
        const profile = await studentsService.get('me');
        handleUserChange({ ...profile, token: user.token });
      }
    }
    fetchUser();
  }, []);

  const handleUserChange = useCallback((user) => {
    console.log('Updating user context', user);
    if (!user) {
      localStorage.removeItem('current-user');
      localStorage.removeItem('user-access-token');
    } else {
      localStorage.setItem('user-access-token', user.token);
      localStorage.setItem('current-user', JSON.stringify(user));
    }
    setUser(user);
  }, [])

  const logout = useCallback(() => {
    handleUserChange();
    navigate('/login')
  }, [])


  return (
    <AuthContext.Provider value={{ user, onUserChange: handleUserChange, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthStore as default, AuthContext}