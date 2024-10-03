import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AddRecipePage from './pages/AddRecipePage'; 
import ProfilePage from './pages/ProfilePage';

import './App.css';

const App = () => {
  const [user, setUser] = useState(null); // Manage user state

  // Check localStorage for user on initial load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Function to handle login
  const handleLogin = (loggedInUser) => {
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    setUser(loggedInUser); // Update state when user logs in
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null); // Update state when user logs out
  };

  return (
    <Router>
      <div className="nav">
        <Link to="/">Home</Link>
        {!user && ( // Conditionally render Login and Register links
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {user && ( // Show the Logout button and Profile link only when user is logged in
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/login" 
          element={<LoginPage onLogin={handleLogin} />} 
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path="/add-recipe" 
          element={<AddRecipePage onLogout={handleLogout} user={user} />} 
        />
        <Route 
          path="/profile" 
          element={<ProfilePage onLogout={handleLogout} user={user} />} // Pass handleLogout to ProfilePage
        />
      </Routes>
    </Router>
  );
};

export default App;
