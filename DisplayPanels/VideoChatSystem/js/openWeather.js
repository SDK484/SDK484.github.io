// access data
var OPENMAP_API_KEY = "1bebf924115a028554101d8a8ca6af71";
var CITY = 'Bangor';
var COUNTRY = 'UK';
var WEATHER_DATA = 'https://api.openweathermap.org/data/2.5/forecast?q='+CITY+','+COUNTRY+'&appid='+OPENMAP_API_KEY;

// date
var todayDate = new Date();
var dd = String(todayDate.getDate()).padStart(2, '0');
var mm = String(todayDate.getMonth() + 1).padStart(2, '0');
var yyyy = todayDate.getFullYear();
todayDate = dd + '/' + mm + '/' + yyyy;

// get weather data
$.getJSON(WEATHER_DATA, function(data) {
	var weatherFore = data.list;
	var weather = document.getElementById("weatherBoxFeed");
	weather.innerHTML += ' \
		<h3 style="position:absolute;top:2px;left:32px;">'+data.city.name+'</h3> \
		<h3 style="position:absolute;top:2px;left:215px;">'+todayDate+' - <a id="infoTime"></a></h3>';
	weatherFore.forEach(function(report) {
		var weaReport = report.dt_txt.split(' ');
		var weaDateSort = weaReport[0].split('-');
		var weaDate = weaDateSort[2]+'/'+weaDateSort[1]+'/'+weaDateSort[0];
		var weaTime = weaReport[1].slice(0, -3); 
		weather.innerHTML += ' <div class="weatherSlides fade"> \
			<img style="position:absolute;top:25px;left:15px;" src="http://openweathermap.org/img/wn/'+report.weather[0].icon+'@2x.png" /> \
			<h1 style="position:absolute;top:40px;left:120px;">'+convertKelvinToCelsius(report.main.temp)+'</h1> \
			<img style="position:absolute;top:25px;left:195px;" src="http://openweathermap.org/img/wn/50d@2x.png" /> \
			<h1 style="position:absolute;top:40px;left:290px;">'+convertMpsToMph(report.wind.speed)+'</h1> \
			<h4 style="position:absolute;top:100px;left:30px;">'+report.weather[0].description+'  -  '+weaDate+' '+weaTime+'</h4></div>';
	});
	startTime();
	// cycle through weather slides
	showSlidesWeather();
});

// slide show
var slideIndexWeather = 0;
function showSlidesWeather() {
	var i;
	var slides = document.getElementsByClassName("weatherSlides");
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";  
	}
	slideIndexWeather++;
	if (slideIndexWeather > slides.length) {slideIndexWeather = 1}
	slides[slideIndexWeather-1].style.display = "block";
	setTimeout(showSlidesWeather, 8000); // Change image every 8 seconds
}

// converters
function convertKelvinToCelsius(kelvin) {
	if (kelvin < (0)) {
		return 'Below absolute zero (0 K)';
	} else {
		return Math.round((kelvin-273.15))+"°C";
	}
}

function convertMpsToMph(mps) {
	return Math.round(Math.round(mps * 3600 / 1610.3*1000)/1000)+" mph";
}

// time
function startTime() {
	var todayTime = new Date();
	var h = todayTime.getHours();
	var m = todayTime.getMinutes();
	var s = todayTime.getSeconds();
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById("infoTime").innerHTML = h + ":" + m + ":" + s;
	var t = setTimeout(startTime, 500);
}

function checkTime(i) {
  if (i < 10) {
		i = "0" + i;
	}
  return i;
}
