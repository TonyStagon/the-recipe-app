import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterPage.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simplified form data for testing

    // ReTempered 
    const userData = {
      name,
      surname,
      email,
      username,
      password,
      profilePic: profilePic ? profilePic.name : null,  // Store file name for now
    };

    try {
      // POST request to your JSON server
      const response = await axios.post("http://localhost:5000/users", userData);

      // Check if response was successful and navigate
      if (response.status === 201) {
        alert("Registration Successful!");
        navigate("/login");  // Redirect to login page on success
      } else {
        alert("Registration failed!");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration.");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setProfilePic(e.target.files[0])}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;