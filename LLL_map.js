// code is from
//https://stackoverflow.com/questions/12661124/how-to-apply-hovering-on-html-area-tag


//gets called by moveMagnifier
//function returns the cursor position as a string
//takes in event object
function getCursorPos(e) {
    var boundingRectCoords, x=0, y=0;
    //use e f it exists otherwise use window.event
    e = e || window.event;

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
   //e.preventDefault;

    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);

    x = pos.x;
    y = pos.y;

    //console.log(x);
    //console.log(y);
    //console.log(zoom);

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
  glass.style.backgroundImage = "url('" + "new-lll-asia-middle-east-map-november-2018_orig copy.jpg" + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundPosition = "-" + (glass.pageX) + "px -" + (glass.pageY) + "px";
  glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
  glass.style.zIndex = 2;

  

  //console.log(glass.style.backgroundSize);
  //console.log(glass.style.backgroundPosition);
  //console.log(pos);
  
  /* Execute a function when someone moves the magnifier glass over the image: */
  //for some reason it doesn't work when you put in function parameters which is super weird
  glass.addEventListener("mousemove", function(e) { moveMagnifier(e, zoom); });
  img.addEventListener("mousemove", function(e) { moveMagnifier(e, zoom); });
  var useMap = document.getElementById("myForRealMap");
  useMap.addEventListener("mousemove", function(e) { moveMagnifier(e, zoom); });
  

  //debug stuff
  //glass.style.left = ("170")+("px");
  //glass.style.top = ("120")+("px");
}

//function that finds link in area and takes you to it
function goToLink() {
    console.log("yeeep boi");
}

function activateAreas(){
    var newArea = document.getElementById("china");
    newArea.addEventListener("mousedown", goToLink);
   // console.log(newArea.parentNode.parentNode.parentNode);
}

window.onload = function() {
   
    magnify(3);
   
    /*
    getZindex("testArea");
    getZindex("myGlass")
    getZindex("myMap");
    getZindex("myForRealMap");
    var test = document.getElementById("testArea");
    console.log(test);
    */

  };

  function areaActive(){
      console.log("yeeep boi");
  }

  function getZindex(elementID){
    var test = document.getElementById(elementID);
    var daZIndex = window.getComputedStyle(test,null).getPropertyValue("z-index")
    console.log (elementID + " : " + daZIndex);
    //test.style.zIndex = 2;
    console.log (elementID + " : " + daZIndex);
  }

