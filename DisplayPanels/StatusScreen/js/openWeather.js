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
		var dataArrayCityStats = data.city;
		var dataArrayWeather = data.list;
		dataArrayWeather.forEach(function(dayData) {
			//console.log(dayData);
		});
	});
	// get element
	/*var ele = document.getElementById('weatherBox');
	// component
	ele.innerHTML = '<table> \
						<tr> \
							<td>WEATHER REPORT</td> \
						</tr> \
						<tr> \
							<td>today: </td> \
						</tr> \
					</table>';*/
}
