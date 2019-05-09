// start-up

var OPENMAP_API_KEY = "1bebf924115a028554101d8a8ca6af71";
var CITY = 'Lisburn';
var COUNTRY = 'UK';
var WEATHER_DATA = 'http://api.openweathermap.org/data/2.5/forecast?q='+CITY+','+COUNTRY+'&appid='+OPENMAP_API_KEY;

// functions

function addWeatherBox() {
	// get weather data
	$.getJSON(WEATHER_DATA, function(data) {
		// cycle through and get each
		// day and show various stats
		var count = 0;
		var dataArrayCityStats = data.city;
		var dataArrayWeather = data.list;
		// add title
		var locDetails = document.getElementById("locationDetails");
		locDetails.innerHTML += " " + dataArrayCityStats.name + "," + dataArrayCityStats.country + " - pop. " + dataArrayCityStats.population;
		// add number of tables
		var weatherBoxFeed = document.getElementById("weatherBoxFeed");
		for (var i = 0; i < 6; i++) {
			weatherBoxFeed.innerHTML += ' \
				<div class="weatherSlides fade"> \
					<div class="boxPanelData"> \
						<table class="weatherTable"> \
							<tr class="weatherTableRow"> \
								<td class="weatherTableCell">'+dataArrayWeather[count].dt_txt+'<br/>'+dataArrayWeather[count].weather[0].description+'<br/>'+convertKelvinToCelsius(dataArrayWeather[count].main.temp)+'<br/>'+convertMpsToMph(dataArrayWeather[count].wind.speed)+'</td> \
								<td class="weatherTableCell">'+dataArrayWeather[count+1].dt_txt+'<br/>'+dataArrayWeather[count+1].weather[0].description+'<br/>'+convertKelvinToCelsius(dataArrayWeather[count+1].main.temp)+'<br/>'+convertMpsToMph(dataArrayWeather[count+1].wind.speed)+'</td> \
								<td class="weatherTableCell">'+dataArrayWeather[count+2].dt_txt+'<br/>'+dataArrayWeather[count+2].weather[0].description+'<br/>'+convertKelvinToCelsius(dataArrayWeather[count+2].main.temp)+'<br/>'+convertMpsToMph(dataArrayWeather[count+2].wind.speed)+'</td> \
							</tr> \
							<tr class="weatherTableRow"> \
								<td class="weatherTableCell">'+dataArrayWeather[count+3].dt_txt+'<br/>'+dataArrayWeather[count+3].weather[0].description+'<br/>'+convertKelvinToCelsius(dataArrayWeather[count+3].main.temp)+'<br/>'+convertMpsToMph(dataArrayWeather[count+3].wind.speed)+'</td> \
								<td class="weatherTableCell">'+dataArrayWeather[count+4].dt_txt+'<br/>'+dataArrayWeather[count+4].weather[0].description+'<br/>'+convertKelvinToCelsius(dataArrayWeather[count+4].main.temp)+'<br/>'+convertMpsToMph(dataArrayWeather[count+4].wind.speed)+'</td> \
								<td class="weatherTableCell">'+dataArrayWeather[count+5].dt_txt+'<br/>'+dataArrayWeather[count+5].weather[0].description+'<br/>'+convertKelvinToCelsius(dataArrayWeather[count+5].main.temp)+'<br/>'+convertMpsToMph(dataArrayWeather[count+5].wind.speed)+'</td> \
							</tr> \
						</table> \
					</div> \
				</div>';
			// increase count
			count += 6;
		}
		//console.log(dataArrayWeather);
		// cycle through weather reports
		showSlidesWeather();
	});
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
	return Math.round(Math.round(mps * 3600 / 1610.3*1000)/1000)+" mph (wind)";
}
