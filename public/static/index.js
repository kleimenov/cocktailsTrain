/*
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
*/
/*
<script>
        const createIngredientField = () => {
            let ingredientFieldContainer = document.createElement("div");
            let ingredientNameField = document.createElement("input");
            ingredientNameField.name = `ingredient`;
            ingredientNameField.placeholder = `Amount`;
            let ingredientAmountField = document.createElement("input");
            ingredientAmountField.name = `amount`;
            ingredientAmountField.placeholder = `Amount`;
            ingredientFieldContainer.appendChild(ingredientNameField);
            ingredientFieldContainer.appendChild(ingredientAmountField);
            const ingredientsBox = document.getElementById('ingredients-field');
            ingredientsBox.appendChild(ingredientFieldContainer);
        }
        const addIngredient = document.getElementById('addIngredient');
        addIngredient.addEventListener('click', createIngredientField);
    </script>
*/


const createIngredientField = () => {
    let ingredientFieldContainer = document.createElement("div");
    let ingredientNameField = document.createElement("input");
    ingredientNameField.name = `ingredient`;
    ingredientNameField.placeholder = `Amount`;
    let ingredientAmountField = document.createElement("input");
    ingredientAmountField.name = `amount`;
    ingredientAmountField.placeholder = `Amount`;
    ingredientFieldContainer.appendChild(ingredientNameField);
    ingredientFieldContainer.appendChild(ingredientAmountField);
    const ingredientsBox = document.getElementById('ingredients-field');
    ingredientsBox.appendChild(ingredientFieldContainer);
}
const addIngredient = document.getElementById('addIngredient');
addIngredient.addEventListener('click', createIngredientField);