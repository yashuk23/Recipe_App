const searchBox = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-btn');
const recipeContainer=document.querySelector('.recipeContainer');

const fetch_API = async (search) => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
        const data = await response.json();

        data.meals.forEach(meal => {
            console.log(meal);
            const recipeDiv=document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML=
            `
                <img src="${meal.strMealThumb}">
                <h3>${meal.strMeal}</h3>
                <p>${meal.strArea}</p>
                <p>${meal.strCategory}</p>
                
            `
            const button=document.createElement('button');
            button.textContent='View Recipe';
            button.classList.add('recipe-btn');
            recipeDiv.appendChild(button);
            recipeContainer.appendChild(recipeDiv);

            button.addEventListener('click',()=>
            {
                openRecipe(meal);
            })
        }
        )
    }
    catch(err)
    {
        console.log(err);
    }
}

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const data = searchBox.value.trim();
    fetch_API(data);
})

