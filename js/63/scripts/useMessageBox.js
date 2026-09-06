import showMessage from "./messageBox.js";
const buttonArr = ["yes", "no", "probably", "probably not"];

const InputCont = document.querySelector("#msg");
document.querySelector("#showMsg").addEventListener("submit", (e) =>{
    e.preventDefault();
showMessage(InputCont.value, buttonArr, (e) => {
 console.log("recieved input " + e);
});
});