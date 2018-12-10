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

    //console.log(areaType);
    //console.log(coordStr);

}

//gets called by moveMagnifier
//function returns the cursor position as a string
//takes in event object
function getCursorPos(e) {
    var boundingRectCoords, x=0, y=0;
    //use e f it exists otherwise use window.event
    e = e || window.event;

    console.log(e);
    console.log(window.event)

    //get the image object in this case its our map
    var img = document.getElementById("myMap");

    /*get the x and y positions of the image:*/
    boundingRectCoords = img.getBoundingClientRect();

    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - boundingRectCoords.left;
    y = e.pageY - boundingRectCoords.top;

    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;

    //return cursor position object which has cursor x and y position
    var cursorPos = {x : x, y : y};
    //console.log(cursorPos.x);
    //console.log(cursorPos.y);
    return cursorPos;
}

//function handles movement of magnifying glass
//takes in mouse event and zoom scale
function moveMagnifier(e, zoom) {
    var pos, x, y, bw;

    //get the glass and image
    var glass = document.getElementById("myGlass");
    img = document.getElementById("myMap");

    /*prevent any other actions that may occur when moving over the image*/
    e.preventDefault;

    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);

    x = pos.x;
    y = pos.y;


    //console.log(e);

    console.log(x);
    console.log(y);
    console.log(zoom);

    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;

    /*prevent the magnifier glass from being positioned outside the image:*/
    if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
    if (x < w / zoom) {x = w / zoom;}
    if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
    if (y < h / zoom) {y = h / zoom;}

    /*set the position of the magnifier glass:*/
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";

    /*display what the magnifier glass "sees":*/
    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";

}

//make the magnifying glass
function magnify(zoom) {
    var img, glass, w, h, bw,pos,x,y;
    img = document.getElementById("myMap");
    
    /*create magnifier glass:*/
  glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");
  glass.setAttribute("id", "myGlass");

  /*insert magnifier glass:*/
  img.parentElement.insertBefore(glass, img);
  //console.log(img.parentElement);

  /*set background properties for the magnifier glass:*/
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundPosition = "-" + (glass.pageX) + "px -" + (glass.pageY) + "px";
  glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";

  

  //console.log(glass.style.backgroundSize);
  //console.log(glass.style.backgroundPosition);
  //console.log(pos);
  
  /* Execute a function when someone moves the magnifier glass over the image: */
  //for some reason it doesn't work when you put in function parameters which is super weird
  glass.addEventListener("mousemove", function(e) { moveMagnifier(e, zoom); });
  img.addEventListener("mousemove", function(e) { moveMagnifier(e, zoom); });

  //debug stuff
  glass.style.left = ("170")+("px");
  glass.style.top = ("120")+("px");
}



window.onload = function() {
   // initCanvas();
   magnify(3);
   
  };

