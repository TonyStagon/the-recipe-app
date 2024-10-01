import React from "react";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Surname: {user.surname}</p>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <img src={user.profilePicture} alt="Profile" />
      {/* Add functionality to update profile */}
    </div>
  );
};

export default ProfilePage;
