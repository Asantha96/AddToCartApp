
const inputFieldElement = document.getElementById("input-field");
const addButtonElement = document.getElementById("add-button");

addButtonElement.addEventListener("click", function(){
  let inputValue = inputFieldElement.value;
  console.log(inputValue);
});