'use strict';
//a
  //1
function multiply(x, y){
    return x * y;
}
console.log(multiply(5,5));
console.log(multiply(3,7));
   //2
function GetMultiplier(){
    return function(x, y){
        return x * y;
    }
}
const multiplier = GetMultiplier();
console.log(multiplier(8,7));
//3
function GetMultiplier2(x){
    return function(y){
        return x * y;
    }
}
const multiplierThirteen = GetMultiplier2(13);
console.log(multiplierThirteen(5));
console.log(multiplierThirteen(10));


//b
//1
function myEvery(array, func){
    for(var i = 0; i < array.length; i++){
        if(!func(array[i])){
            return false;
        }
    }
    return true;
}
var letters = ["a", "b", "c",];
function isUpper(str){
    if(str === str.toUpperCase()){
        return true;
    }
    return false;
}
function isLower(str){
    if(str === str.toLowerCase()){
        return true
    }
    return false
}
var result = myEvery(letters, isUpper);
console.log(result);
result = letters.every(isUpper)
console.log(result);
var result2 = myEvery(letters, isLower);
console.log(result2);
result2 = letters.every(isLower);
console.log(result2);

//2
function mySome(array, func){
    for(var i = 0; i < array.length; i++){
        if(func(array[i])){
            return true;
        }
    }
    return false;
}
const letters2 = ["a", "B", "c"]
var someResult = mySome(letters2, isUpper);
console.log(someResult);
someResult = letters2.some(isUpper);
console.log(someResult);
var someResult2 = mySome(letters2, isLower);
console.log(someResult2);
someResult2 = letters2.some(isLower);
console.log(someResult2);
