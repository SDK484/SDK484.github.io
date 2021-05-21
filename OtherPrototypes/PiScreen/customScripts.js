/* slideshow */

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";
	
	// check slide before to load img/gif
	if (slideIndex-1 == 2) {
		showGif();
	}
}

var autoInterval = setInterval(function(){
  document.getElementById("next").click();
}, 10000);

/* clock / date */

var date = new Date();
			
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();

if (month.length < 2) {
	month = '0' + month;
}

if (day.length < 2) {
	day = '0' + day;
}

var dateTime = day + "/" + month + "/" + year;

document.getElementById("MyDateDisplay").innerText = dateTime;
document.getElementById("MyDateDisplay").textContent = dateTime;
			
function showTime(){
	var date = new Date();
	var h = date.getHours(); // 0 - 23
	var m = date.getMinutes(); // 0 - 59
	var s = date.getSeconds(); // 0 - 59

	var session = "am";

	if (h == 0) {
		h = 12;
	}

	if (h > 12) {
		h = h - 12;
		session = "pm";
	}

	h = (h < 10) ? "0" + h : h;
	m = (m < 10) ? "0" + m : m;
	s = (s < 10) ? "0" + s : s;

	var time = h + ":" + m + ":" + s + " " + session;
	document.getElementById("MyClockDisplay").innerText = time;
	document.getElementById("MyClockDisplay").textContent = time;

	setTimeout(showTime, 1000);
}
showTime();

/* Get gif to show */

function showGif() {
	const rndInt = Math.floor(Math.random() * 2) + 1;
	let gifType = "";
	if (rndInt == 1) {
		gifType = "game";
	} else if (rndInt == 2) {
		gifType = "trend";
	}
	const rndIntLas = Math.floor(Math.random() * 10) + 1;
	document.getElementById("slideGif").src = `./data/${gifType}_${rndIntLas}.gif`;
	document.getElementById("slideGif").alt = `${gifType}_${rndIntLas}`;
}