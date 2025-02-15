import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/Homepage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/Navbar';  // Make sure to import Navbar
import AdvertisementForm from './components/pages/AdvertisementForm';
import MyBusiness from './components/MyBusiness';
import BusinessForm from './components/pages/BusinessForm';  // Import the advertisement form component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    console.log('Token:', token);
    console.log('User Data:', userData);

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    console.log('isLoggedIn after logout:', isLoggedIn);
  };

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={<HomePage isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
        />
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Login onLoginSuccess={(userData) => {
                setIsLoggedIn(true);
                setUser(userData);
              }} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isLoggedIn ? (
              <Register onRegisterSuccess={(userData) => {
                setIsLoggedIn(true);
                setUser(userData);
              }} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/advertisement-form"
          element={
            isLoggedIn ? (
              <AdvertisementForm />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route 
        path="/businesses"
        element={
          isLoggedIn ? (
            <MyBusiness />
          ) : (
            <Navigate to="/login" />
          )
        }
        />
         <Route 
        path="/business-form"
        element={
          isLoggedIn ? (
            <BusinessForm />
          ) : (
            <Navigate to="/login" />
          )
        }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
