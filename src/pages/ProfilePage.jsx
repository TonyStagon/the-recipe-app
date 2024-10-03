import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/ProfilePage.css'; // Import your CSS file for styling

const ProfilePage = ({ user, onLogout }) => {
  const navigate = useNavigate(); // Initialize navigate

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to login if user is not authenticated
    }
  }, [user, navigate]);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null); // State for the image file

  useEffect(() => {
    if (user) {
      setName(user.name);
      setSurname(user.surname);
      setEmail(user.email);
      setUsername(user.username);
      setImage(user.image); // Assuming user.image holds the image URL
    }
  }, [user]);

  const updateUserProfile = async (userId, updatedData) => {
    const formData = new FormData();
    Object.keys(updatedData).forEach(key => {
      formData.append(key, updatedData[key]);
    });
    if (image) {
      formData.append('image', image); // Append the image file if it exists
    }

    try {
      const response = await axios.put(`http://localhost:5000/users/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw new Error("Failed to update profile.");
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      name,
      surname,
      email,
      username,
      password,
    };

    try {
      await updateUserProfile(user.id, updatedData);
      localStorage.setItem('user', JSON.stringify({ ...user, ...updatedData }));
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile.");
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      {/* Display the profile picture */}

      <form onSubmit={handleProfileUpdate}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Surname" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Update Profile</button>
      </form>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
