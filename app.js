const searchBox = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-btn');
const recipeContainer = document.querySelector('.recipeContainer');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn')

const fetch_API = async (search) => {
    try {
        recipeContainer.innerHTML = "";
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
        const data = await response.json();

        if (!data.meals) {
            recipeContainer.innerHTML = "<h2>No recipes found 😢</h2>";
            return;
        }
        data.meals.forEach(meal => {
            console.log(meal);
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML =
                `
                <img src="${meal.strMealThumb}">
                <h3>${meal.strMeal}</h3>
                <p>${meal.strArea}</p>
                <p>${meal.strCategory}</p>
                
            `
            const button = document.createElement('button');
            button.textContent = 'View Recipe';
            button.classList.add('recipe-btn');
            recipeDiv.appendChild(button);
            recipeContainer.appendChild(recipeDiv);

            button.addEventListener('click', () => {
                openRecipePopup(meal);
            })

        }
        )
    }
    catch (err) {
        console.log(err);
    }
}

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const data = searchBox.value.trim();
    fetch_API(data);
})

const fetchIndgredients = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else {
            break;
        }
    }
    return ingredientsList;
}
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3 class="ingredientList">Ingredients:</h3>
    <ul>${fetchIndgredients(meal)}</ul>
    <div>
        <h3>Instructions:</h3>
        <p class="instructionName">${meal.strInstructions}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
});