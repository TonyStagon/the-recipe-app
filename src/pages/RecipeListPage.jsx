import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/recipes/${id}`);
      setRecipes(recipes.filter(recipe => recipe.id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div>
      <h2>Recipe List</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.recipeName}</h3>
            <p>Category: {recipe.category}</p>
            <p>Ingredients: {recipe.ingredients}</p>
            <p>Instructions: {recipe.instructions}</p>
            <p>Prep Time: {recipe.prepTime}</p>
            <p>Cook Time: {recipe.cookTime}</p>
            <p>Servings: {recipe.servings}</p>
            <button onClick={() => navigate(`/edit-recipe/${recipe.id}`)}>Edit</button>
            <button onClick={() => handleDelete(recipe.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeListPage;