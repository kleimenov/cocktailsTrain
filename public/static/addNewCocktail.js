//implement function "createIngredientField", fucntion create DOM element, add specific classes

const createIngredientField = () => {
    let ingredientFieldContainer = document.createElement("div");
    let addAttributesDiv = [ "d-flex", "flex-row", "form-inline"];
    let addAttributesInput = ["form-control", "mt-1", "mr-1"];
    
    for (let index in addAttributesDiv) {
      ingredientFieldContainer.classList.add(addAttributesDiv[index])
    }

    let ingredientNameField = document.createElement("input");
    for (let index in addAttributesInput) {
      ingredientNameField.classList.add(addAttributesInput[index])
    }
    ingredientNameField.name = `ingredient`;
    ingredientNameField.placeholder = `Ingredient`;

    let ingredientAmountField = document.createElement("input");
    for (let index in addAttributesInput) {
      ingredientAmountField.classList.add(addAttributesInput[index])
    }

    ingredientAmountField.name = `amount`;
    ingredientAmountField.placeholder = `Amount`;
    ingredientFieldContainer.appendChild(ingredientNameField);
    ingredientFieldContainer.appendChild(ingredientAmountField);
    const ingredientsBox = document.getElementById('ingredients-field');
    ingredientsBox.appendChild(ingredientFieldContainer);

}
const addIngredient = document.getElementById('addIngredient');
addIngredient.addEventListener('click', createIngredientField);