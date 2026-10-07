
function getElement(selector) {
  return document.querySelector(selector);
}

function setCss(element, property, value) {
  // element.style.property = value;
  element.style[property] = value;
}

function getCss(element, property) {
  // return element.style[property];
  return getComputedStyle(element)[property];
}

function on(element, eventType, callback) {
  element.addEventListener(eventType, callback);
}

function click(element, callback) {
  on(element, 'click', callback);
}
function setDisplayType(element, boolValue, displayType){
    
    setCss(element, "display", boolValue ? displayType : "none");
}
function  addSparkle(element, duration, speed){
  const ogcolor = getCss(element, "color");
    const interval = setInterval ( () => {
        const randomColor = GetRandomrgbColor();
        setCss(element, "color", randomColor);
    },speed);
    setTimeout(() => {
      clearInterval(interval);
      setCss(element, "color", ogcolor)
    }, duration);
    
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


export default function (selector) {
  const element = getElement(selector);

  return {
    css: function (property, value) {
      //console.log(arguments);

      if (arguments.length < 2) {
        return getCss(element, property);
      } else {
        setCss(element, property, value);
      }
    },
    on: (eventType, callback) => on(element, eventType, callback),
    click: callback => click(element, callback),
    hide: () => setDisplayType(element,  false),
    show: (displayType = "inline-block") => setDisplayType(element, true, displayType),
    sparkle: (duration, speed = 1) => addSparkle(element, duration * 1000, speed * 1000)
  };
}
