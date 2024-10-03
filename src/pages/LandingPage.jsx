import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to Arthur Recipe App</h1>
      <p>Your favorite place to store and manage recipes!</p>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default LandingPage;