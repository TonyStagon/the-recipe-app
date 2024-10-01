import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddRecipePage = () => {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecipe = { recipeName, ingredients, instructions, category, prepTime, cookTime, servings };

    try {
      await axios.post("http://localhost:5000/recipes", newRecipe);
      navigate("/home");
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Recipe</h2>
      <input type="text" placeholder="Recipe Name" onChange={(e) => setRecipeName(e.target.value)} required />
      <textarea placeholder="Ingredients" onChange={(e) => setIngredients(e.target.value)} required />
      <textarea placeholder="Instructions" onChange={(e) => setInstructions(e.target.value)} required />
      <input type="text" placeholder="Category" onChange={(e) => setCategory(e.target.value)} required />
      <input type="text" placeholder="Preparation Time" onChange={(e) => setPrepTime(e.target.value)} required />
      <input type="text" placeholder="Cooking Time" onChange={(e) => setCookTime(e.target.value)} required />
      <input type="number" placeholder="Servings" onChange={(e) => setServings(e.target.value)} required />
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipePage;
