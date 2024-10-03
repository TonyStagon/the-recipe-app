import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user from local storage
    window.location.reload(); // Refresh the page
  };

  return (
    <div>
      <h1>Welcome to Recipe App</h1>
      {user ? (
        <div>
          <p>Hello, {user.name}! Ready to add a new recipe?</p>
          <Link to="/add-recipe">Add New Recipe</Link>
         
        </div>
      ) : (
        <p>Please <Link to="/login">login</Link> to manage your recipes.</p>
      )}
    </div>
  );
};

export default HomePage;
