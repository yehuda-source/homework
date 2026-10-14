
function getElement(selector) {
  return document.querySelectorAll(selector);
}

function setCss(elements, property, value) {
  elements = elements instanceof NodeList || elements instanceof HTMLCollection
  ? [...elements]
  :Array.isArray(elements)
  ? elements
  : [elements]
  elements.forEach(element => {
    element.style[property] = value;
  });
  
}

function getCss(elements, property) {
  
   elements = elements instanceof NodeList || elements instanceof HTMLCollection
  ? [...elements]
  :Array.isArray(elements)
  ? elements
  : [elements]
  return getComputedStyle(elements[0])[property];
}

function on(elements, eventType, callback) {
elements.forEach(element => {
  element.addEventListener(eventType, callback);
});
  
}

function click(elements, callback) {
  on(elements, 'click', callback);
}
function setDisplayType(elements, boolValue, displayType){
    
      setCss(elements, "display", boolValue ? displayType : "none");
   
    
}
function  addSparkle(elements, duration, speed){
  elements.forEach(element => {
    const ogcolor = getCss(element, "color");
    const interval = setInterval ( () => {
        const randomColor = GetRandomrgbColor();
        setCss(element, "color", randomColor);
    },speed);
    setTimeout(() => {
      clearInterval(interval);
      setCss(element, "color", ogcolor)
    }, duration);
  });
  
    
}
function GetRandomrgbColor(){
    let r = GetrgbPart();
    let g = GetrgbPart();
    let b = GetrgbPart();
    return `rgb(${r}, ${g}, ${b}`;
}
function GetrgbPart(){
    return Math.floor(Math.random() * 256);
}

function GetText(elements) {
  return elements[0].innerText;
}

function SetText(elements, text) {
  elements.forEach(element => {
    element.innerText = text;
  });
  
}

function addClass(elements, className){
  elements.forEach(element => {
    element.classList.add(className);
  });
  
}
export default function (selector) {
  const elements = getElement(selector);

  return {
    css: function (property, value) {
      

      if (arguments.length < 2) {
        return getCss(elements, property);
      } else {
        setCss(elements, property, value);
      }
    },
    on: (eventType, callback) => on(elements, eventType, callback),
    click: callback => click(elements, callback),
    hide: () => setDisplayType(elements,  false),
    show: (displayType = "inline-block") => setDisplayType(elements, true, displayType),
    sparkle: (duration, speed = 1) => addSparkle(elements, duration * 1000, speed * 1000),
    text: function (str) {
      if (arguments.length < 1){
        return GetText(elements);
      }
      else{
        return SetText(elements, str)
      }
  },
  addClass: (className) => {addClass(elements, className);
  
}
  }
}
