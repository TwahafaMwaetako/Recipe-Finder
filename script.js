const APP_ID = 'f1e73734';
const APP_KEY = 'fe790f048631cf335cf0f5d99763528d';

const ingredientsInput = document.getElementById('ingredients');
const searchBtn = document.getElementById('search-btn');
const recipeList = document.getElementById('recipe-list');
const modal = document.getElementById('recipe-modal');
const recipeDetails = document.getElementById('recipe-details');
const closeBtn = document.querySelector('.close');

searchBtn.addEventListener('click', searchRecipes);
closeBtn.addEventListener('click', closeModal);

async function searchRecipes() {
    const ingredients = ingredientsInput.value.split(',').map(item => item.trim());
    const url = `https://api.edamam.com/search?q=${ingredients.join(',')}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayRecipes(data.hits);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

function displayRecipes(recipes) {
    recipeList.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <h3>${recipe.recipe.label}</h3>
        `;
        recipeCard.addEventListener('click', () => showRecipeDetails(recipe.recipe));
        recipeList.appendChild(recipeCard);
    });
}

function showRecipeDetails(recipe) {
    recipeDetails.innerHTML = `
        <h2>${recipe.label}</h2>
        <img src="${recipe.image}" alt="${recipe.label}">
        <h3>Ingredients:</h3>
        <ul>
            ${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        <h3>Instructions:</h3>
        <p>For full instructions, please visit: <a href="${recipe.url}" target="_blank">${recipe.source}</a></p>
        <h3>Nutrition:</h3>
        <p>Calories: ${Math.round(recipe.calories)}</p>
    `;
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}