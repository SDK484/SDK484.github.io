// Elements for taking the snapshot
var video = document.getElementById('video');

// Trigger photo take
document.getElementById("place").addEventListener("click", function() {
	var img = document.getElementById("imgSrc");
	var canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	var context = canvas.getContext('2d');
	context.drawImage(video, 0, 0, img.width, img.height);
	img.src = canvas.toDataURL();
	imageZoom("imgSrc", "imgRes");
});

document.getElementById("flip1").addEventListener("click", function() {
	document.getElementById("video").className = "";
	document.getElementById("video").className = "flip1";
	document.getElementById("imgSrc").className = "flip1";
});

document.getElementById("flip2").addEventListener("click", function() {
	document.getElementById("video").className = "";
	document.getElementById("video").className = "flip2";
	document.getElementById("imgSrc").className = "flip2";
});

document.getElementById("flip3").addEventListener("click", function() {
	document.getElementById("video").className = "";
	document.getElementById("video").className = "flip3";
	document.getElementById("imgSrc").className = "flip3";
});

document.getElementById("flip4").addEventListener("click", function() {
	document.getElementById("video").className = "";
	document.getElementById("imgSrc").className = "";
});


// Get access to the camera!
const constraints = {
  video: {
    facingMode: "environment"
  }
};
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
	// Not adding `{ audio: true }` since we only want video now
	navigator.mediaDevices.getUserMedia({ video: constraints }).then(function(stream) {
			//video.src = window.URL.createObjectURL(stream);
			video.srcObject = stream;
			video.play();
	});
}


function imageZoom(imgID, resultID) {
	removeElementsByClass("imgLens");
	
  var img, lens, result, cx, cy;
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);
  /*create lens:*/
  lens = document.createElement("DIV");
  lens.setAttribute("class", "imgLens");
  /*insert lens:*/
  img.parentElement.insertBefore(lens, img);
  /*calculate the ratio between result DIV and lens:*/
  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;
  /*set background properties for the result DIV:*/
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
  /*execute a function when someone moves the cursor over the image, or the lens:*/
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  /*and also for touch screens:*/
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
	
  function moveLens(e) {
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    /*calculate the position of the lens:*/
    x = pos.x - (lens.offsetWidth / 2);
    y = pos.y - (lens.offsetHeight / 2);
    /*prevent the lens from being positioned outside the image:*/
    if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
    if (y < 0) {y = 0;}
    /*set the position of the lens:*/
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    /*display what the lens "sees":*/
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
  }
	
  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}

function removeElementsByClass(className) {
	var elements = document.getElementsByClassName(className);
	while(elements.length > 0){
			elements[0].parentNode.removeChild(elements[0]);
	}
}


