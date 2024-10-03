import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditRecipePage = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/recipes/${id}`);
        const recipe = response.data;
        setRecipeName(recipe.recipeName);
        setIngredients(recipe.ingredients);
        setInstructions(recipe.instructions);
        setCategory(recipe.category);
        setPrepTime(recipe.prepTime);
        setCookTime(recipe.cookTime);
        setServings(recipe.servings);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRecipe = { recipeName, ingredients, instructions, category, prepTime, cookTime, servings };

    try {
      await axios.put(`http://localhost:5000/recipes/${id}`, updatedRecipe);
      navigate("/recipes"); // Redirect to recipe list after editing
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Recipe</h2>
      <input type="text" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} required />
      <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
      <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
      <input type="text" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} required />
      <input type="text" value={cookTime} onChange={(e) => setCookTime(e.target.value)} required />
      <input type="number" value={servings} onChange={(e) => setServings(e.target.value)} required />
      <button type="submit">Update Recipe</button>
    </form>
  );
};

export default EditRecipePage;