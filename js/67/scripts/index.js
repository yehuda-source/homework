const select = document.querySelector("#select");
const recipeDisplay = document.querySelector("#recipedisplay");
const recipeNameElement = document.querySelector("#recipeName");
const recipeImg = document.querySelector("#recipeImg");
const ingredientList = document.querySelector("#ingredientList");
async function getJson(url){
    const promise = await fetch(url);
    const object = await promise.json();
    console.log(object);
    return object;
}
async function fillSelect(){
        const json = await getJson("jsons/index.json");
        let addedText;
        for(let i = 0; i<50; i++){
            addedText += `<option id = "recipe${i}">${json.recipes[i].name}</option>`
            
           
         }
          select.innerHTML += addedText
          select.addEventListener("change", async () =>{
            console.log(select.selectedIndex)
            const index = select.selectedIndex - 1;
            const recipe = await getJson(`jsons/recipes/${json.recipes[index].id}.json`);
            console.log(recipe)
            fillRecipeDisplay(recipe);
          })
    // json.recipes.forEach(element => {
        
    //       addedText += `<option>${element.name}</option>`  
    //  });
    // select.innerHTML += addedText
}
function fillRecipeDisplay(recipe){
    recipeNameElement.textContent = recipe.name
    recipeImg.src = ""
    recipeImg.src = recipe.image;
    ingredientList.innerHTML = ""
    console.log(recipe.ingredient_groups)
    recipe.ingredient_groups.forEach(group => {
        group.ingredients.forEach(element => {
            ingredientList.innerHTML += `<li>${element.text}</li>`
        });
    });
}

fillSelect()