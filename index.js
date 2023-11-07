import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL : "https://todoapp-18b00-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");



const inputFieldElement = document.getElementById("input-field");
const addButtonElement = document.getElementById("add-button");
const shoppingListElement = document.getElementById("shopping-list");

//this function is always running when there is a change to the database
onValue(shoppingListInDB, function(snapshot){

  if(snapshot.exists()){
    let shoppingListArray = Object.entries(snapshot.val());
    //console.log(shoppingListArray);
    console.log(snapshot.val())
    clearShoppingListElement();
    shoppingListArray.forEach(array=> {//this array is contain only 2 things, id and value
      let currentItem = array;
      addNewListItem(currentItem);
    });
  }else{
    shoppingListElement.innerHTML = "No items here..."
  }
  
})


addButtonElement.addEventListener("click", function(){
  let inputValue = inputFieldElement.value;
  if(inputValue != ""){
    clearInputField();
    push(shoppingListInDB, inputValue);
  }
});

function clearInputField(){
  inputFieldElement.value = "";
}

function addNewListItem(currentItemArray){
  let itemId = currentItemArray[0];
  let itemValue = currentItemArray[1];
  let newListItem = document.createElement("li");
  newListItem.textContent = itemValue;//shoppingListElement.innerHTML += `<li>${inputValue}</li>`
  newListItem.addEventListener("click", function(){
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemId}`);
    remove(exactLocationOfItemInDB);
  });
  shoppingListElement.appendChild(newListItem);
}

function clearShoppingListElement(){
  shoppingListElement.innerHTML = "";
}