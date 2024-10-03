import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls
import { useNavigate } from 'react-router-dom'; // For navigating after submission

const AddRecipePage = ({ onLogout, user }) => {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [servings, setServings] = useState('');
  const [recipes, setRecipes] = useState([]); // To store and display recipes
  const [searchTerm, setSearchTerm] = useState(''); // Search by recipe name
  const [searchCategory, setSearchCategory] = useState(''); // Search by category
  const navigate = useNavigate();

  useEffect(() => {
    // Load recipes from localStorage when the page loads
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    setRecipes(storedRecipes);
  }, []);

  const handleRecipeSubmit = async (e) => {
    e.preventDefault();
    
    const newRecipe = {
      name: recipeName,
      ingredients: ingredients.split(','), // Split by commas for an array
      instructions,
      category,
      preparationTime,
      cookingTime,
      servings,
    };

    try {
      // Send the recipe to your backend (API)
      await axios.post('http://localhost:5000/recipes', newRecipe);

      // Update localStorage
      const updatedRecipes = [...recipes, newRecipe];
      localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

      // Update the state to display the new list of recipes
      setRecipes(updatedRecipes);

      // Clear input fields after adding the recipe
      setRecipeName('');
      setIngredients('');
      setInstructions('');
      setCategory('');
      setPreparationTime('');
      setCookingTime('');
      setServings('');

    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const handleDeleteRecipe = (index) => {
    // Remove recipe from the state and localStorage
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  const handleEditRecipe = (index) => {
    // Populate the form with the selected recipe for editing
    const recipeToEdit = recipes[index];
    setRecipeName(recipeToEdit.name);
    setIngredients(recipeToEdit.ingredients.join(','));
    setInstructions(recipeToEdit.instructions);
    setCategory(recipeToEdit.category);
    setPreparationTime(recipeToEdit.preparationTime);
    setCookingTime(recipeToEdit.cookingTime);
    setServings(recipeToEdit.servings);
    
    // Remove the recipe being edited from the list temporarily
    handleDeleteRecipe(index);
  };

  // Filtering recipes based on the search term and category
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesName = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = searchCategory === '' || recipe.category.toLowerCase().includes(searchCategory.toLowerCase());
    return matchesName && matchesCategory;
  });

  return (
    <div className="add-recipe-container" style={styles.container}>
      <h2>Add Recipe</h2>
      {user ? ( 
        <div style={styles.formContainer}>
          {/* Recipe form */}
          <form onSubmit={handleRecipeSubmit} style={styles.form}>
            <input
              type="text"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              placeholder="Recipe Name"
              required
            />
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Ingredients (separate with commas)"
              required
            />
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Instructions"
              required
            />
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category (e.g., Dessert, Main Course)"
              required
            />
            <input
              type="text"
              value={preparationTime}
              onChange={(e) => setPreparationTime(e.target.value)}
              placeholder="Preparation Time"
              required
            />
            <input
              type="text"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
              placeholder="Cooking Time"
              required
            />
            <input
              type="number"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
              placeholder="Servings"
              required
            />
            <button type="submit" style={styles.submitButton}>ADD RECIPE</button>
          </form>

          {/* Search filters */}
          <div style={styles.searchContainer}>
            <h3>Search Recipes</h3>
            <input
              type="text"
              placeholder="Search by Recipe Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            <input
              type="text"
              placeholder="Search by Category"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          {/* Display the list of added recipes */}
          <div style={styles.recipeList}>
            <h3>My Recipes</h3>
            {filteredRecipes.length === 0 ? (
              <p>No recipes match your search.</p>
            ) : (
              <ul style={styles.list}>
                {filteredRecipes.map((recipe, index) => (
                  <li key={index} style={styles.recipeItem}>
                    <h4>{recipe.name}</h4>
                    <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
                    <p><strong>Instructions:</strong> {recipe.instructions}</p>
                    <p><strong>Category:</strong> {recipe.category}</p>
                    <p><strong>Preparation Time:</strong> {recipe.preparationTime}</p>
                    <p><strong>Cooking Time:</strong> {recipe.cookingTime}</p>
                    <p><strong>Servings:</strong> {recipe.servings}</p>
                    <button onClick={() => handleEditRecipe(index)} style={styles.editButton}>Edit</button>
                    <button onClick={() => handleDeleteRecipe(index)} style={styles.deleteButton}>Delete</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <p>You are logged out. Please log in to add a recipe.</p>
      )}
    </div>
  );
};

// Inline styles for simplicity
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'flex-end', // Align content to the right
    padding: '20px',
    maxWidth: '1200px', // Limit the maximum width of the container
    margin: '0 auto', // Center the container horizontally
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '40%', // Reduced width for the form
    marginRight: '20px',
  },
  recipeList: {
    width: '50%', // Adjusted width for the recipe list
    marginLeft: '20px',
    maxHeight: '400px', // Set a max height for the list container
    overflowY: 'auto',  // Enable vertical scrolling
  },
  searchContainer: {
    marginBottom: '20px',
  },
  searchInput: {
    display: 'block',
    marginBottom: '10px',
    padding: '8px',
    width: '100%',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  recipeItem: {
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
    marginBottom: '10px',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    border: 'none',
    cursor: 'pointer',
  },
  editButton: {
    marginRight: '10px',
    backgroundColor: '#ffeb3b',
    padding: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '5px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default AddRecipePage;
