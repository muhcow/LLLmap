//https://stackoverflow.com/questions/12661124/how-to-apply-hovering-on-html-area-tag


//function that puts the canvas over the map iamge
function initCanvas(){

    //get the map image
    var map = document.getElementById("myMap");

    var x,y, w,h;

    //get the coordinates and height and width of the image
    x = map.offsetLeft;
    y = map.offsetTop;
    w = map.clientWidth;
    h = map.clientHeight;
   
    /*
    console.log(x);
    console.log(y);
    console.log(w);
    console.log(h);
    */

    //idk wut this is for tbh
    //var mapParent = map.parentNode;
    var newCanvas = document.getElementById("myCanvas");
    //mapParent.appendChild(newCanvas);

    // place the canvas in front of the image
    //zIndex = priority in stack/higher priority means its at the front
    newCanvas.style.zIndex = 1;

    // position it over the image
    newCanvas.style.left = x+'px';
    newCanvas.style.top = y+'px';

    // make same size as the image
    newCanvas.setAttribute('width', w+'px');
    newCanvas.setAttribute('height', h+'px');

    // get it's context for drawing stuff and using canvas context methods
    var hdc = newCanvas.getContext("2d");

    // set the 'default' values for the colour/width of fill/stroke operations
    hdc.fillStyle = 'red';
    hdc.strokeStyle = 'red';
    hdc.lineWidth = 2;

}

//function that is called on mouse hover
//obtain coord string and shape type
//call draw shapes functions
function myHover(element){
    var hoveredElement = element;
    var coordStr = hoveredElement.getAttribute('coords');
    var areaType = hoveredElement.getAttribute('shape');
    element.style.transform = element.style.transform.replace('scale(' + "1" + ')', 'scale(' + "5" + ')');

    switch (areaType){
        case "rect":{

        }

        case "circle":{

        }

    }

    console.log(areaType);
    console.log(coordStr);

}


window.onload = function() {
   // initCanvas();
  };