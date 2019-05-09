// ************************** start-up  ****************************************

// add info details
var infoDetailsDate = document.getElementById("infoDetailsDate");
// date
var todayDate = new Date();
var dd = String(todayDate.getDate()).padStart(2, '0');
var mm = String(todayDate.getMonth() + 1).padStart(2, '0');
var yyyy = todayDate.getFullYear();
todayDate = dd + '/' + mm + '/' + yyyy;
infoDetailsDate.innerHTML += " - Date: " + todayDate;
// time
startTime();

// 3 second delay
setTimeout( function() {
	// add boxes
	addWeatherBox();
	addNewsBox();
	addMapBox();
}, 3000);

//******************************************************************************

function startTime() {
	var todayTime = new Date();
	var h = todayTime.getHours();
	var m = todayTime.getMinutes();
	var s = todayTime.getSeconds();
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById("infoDetailsTime").innerHTML = " - Time: " + h + ":" + m + ":" + s;
	var t = setTimeout(startTime, 500);
}

function checkTime(i) {
  if (i < 10) {
		i = "0" + i;
	}
  return i;
}

// slide show
var slideIndexNews = 0;
var slideIndexWeather = 0;

function showSlidesNews() {
	var i;
	var slides = document.getElementsByClassName("newsSlides");
	var dots = document.getElementsByClassName("dotNews");
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";  
	}
	slideIndexNews++;
	if (slideIndexNews > slides.length) {slideIndexNews = 1}    
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndexNews-1].style.display = "block";  
	dots[slideIndexNews-1].className += " active";
	setTimeout(showSlidesNews, 8000); // Change image every 8 seconds
}

function showSlidesWeather() {
	var i;
	var slides = document.getElementsByClassName("weatherSlides");
	var dots = document.getElementsByClassName("dotWeather");
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";  
	}
	slideIndexWeather++;
	if (slideIndexWeather > slides.length) {slideIndexWeather = 1}    
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndexWeather-1].style.display = "block";  
	dots[slideIndexWeather-1].className += " active";
	setTimeout(showSlidesWeather, 15000); // Change image every 15 seconds
}