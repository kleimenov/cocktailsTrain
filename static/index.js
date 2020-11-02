
const createIngredientField = () => {
    console.log('hey')
    let ingredientFieldContainer = document.createElement("div");
    let ingredientNameField = document.createElement("input");
    let ingredientAmountField = document.createElement("input");
    ingredientFieldContainer.appendChild(ingredientNameField, ingredientAmountField);

    const ingredientsBox = document.getElementById('ingredients-field');
    ingredientsBox.appendChild(ingredientFieldContainer);
}



const addIngredient = document.getElementById('addIngredient');

addIngredient.addEventListener('click', createIngredientField());


