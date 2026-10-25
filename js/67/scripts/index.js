const select = document.querySelector("#select");
const recipeDisplay = document.querySelector("#recipedisplay");
const recipeNameElement = document.querySelector("#recipeName");
const recipeImg = document.querySelector("#recipeImg");
const ingredientList = document.querySelector("#ingredientList");
async function getJson(url){
    try{
    const promise = await fetch(url);
    if(!promise.ok){
        throw new Error(`Http error status: ${promise.status}`);
        
    }
    const object = await promise.json();
    
    console.log(object);
    return object;
    }catch(error){
        console.log(error)
    }
    
}
async function fillSelect(){
        const json = await getJson("jsons/index.json");
        let addedText;
        let recipe
        for(let i = 0; i<50; i++){
            recipe = json.recipes[i]
            addedText += `<option value = "${recipe.id}">${recipe.name}</option>`
            
           
         }
          select.innerHTML += addedText
          select.addEventListener("change", async e =>{
            console.log(select.selectedIndex)
            const index = select.selectedIndex - 1;
            const recipeObject = await getJson(`jsons/recipes/${e.target.value}.json`);
            console.log(recipeObject)
            fillRecipeDisplay(recipeObject);
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