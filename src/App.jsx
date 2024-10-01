import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AddRecipePage from './pages/AddRecipePage';  // Assuming this is where the add recipe form is

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="nav">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Protect the AddRecipePage */}
        <Route 
          path="/add-recipe" element={<AddRecipePage/>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
