export default function(msg, buttonArr, callback){
    console.log(msg);
    const div = document.createElement("div");
    const msgDiv = document.createElement("div");
    
    msgDiv.innerText = msg;
    msgDiv.style.overflow = "auto";
    msgDiv.style.height = "9em"
    div.appendChild(msgDiv);

    div.style.backgroundColor = "lightcyan";
            div.style.border = "1px solid black";
            div.style.padding = "1em";
            div.style.height = "11em";
            div.style.width = "15em";
            div.style.position = "absolute";
            div.style.top = "50%";
            div.style.left = "50%";
            div.style.marginTop = "-5.5em";
            div.style.marginLeft = "-7.5em";

            const buttonDiv = document.createElement("div");
            buttonDiv.style.position = "absolute";
            buttonDiv.style.width = "100%";
            buttonDiv.style.bottom = "1em";
            buttonDiv.style.textAlign = "center";
            buttonDiv.style.left = "0";
            if(buttonArr){
            buttonArr.forEach(element => {
        const newButton = document.createElement("button");
        newButton.innerText = element;
        newButton.addEventListener("click", () =>{
            div.remove();
            callback(element);
            console.log("You picked " + element);
        });
        buttonDiv.appendChild(newButton)
    });}
            
       
            div.appendChild(buttonDiv);


    document.body.appendChild(div);
}