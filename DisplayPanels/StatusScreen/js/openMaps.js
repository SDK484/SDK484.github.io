// start up

var COORD = [54.5234,-6.0353];
var ZOOM = 12;

// functions

function addMapBox() {
	// create map
	var myMap = L.map('map').setView(COORD, ZOOM);
	// tile layer
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1IjoiZG9wZTIwMTkwMSIsImEiOiJjanUzMDh2cG8wOWc2NDRvYjVxbjdtaXY5In0.aMWdr0inz3EewI2H9JCoUQ'
	}).addTo(myMap);
	// 
	//var layer = L.esri.basemapLayer('DarkGray').addTo(myMap);
}