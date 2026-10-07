const theButton = document.querySelector("#theButton");
const theDiv = document.querySelector("#theDiv");
let number = 2;
theButton.addEventListener("click", CreateNewButton
    
 );
function CreateNewButton(){
const newButton = document.createElement("button");
    newButton.textContent = number++;
    theDiv.appendChild(newButton);
    newButton.addEventListener("click", CreateNewButton)
}
// theDiv.addEventListener("click", (e) =>{
//     if(!e.target.matches("button"))){
//     return;
//     }
//     const newButton = document.createElement("button");
//     newButton.textContent = number++;
//     theDiv.appendChild(newButton);
// });