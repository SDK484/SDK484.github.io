// access data
getJsonData().then(function(book){
	// initial coord
  var COORD = [-6.0353,54.5234];
	var ZOOM = 9.5;
	var data = book.json.group;

	// get map & style
	var styleJson = 'https://api.maptiler.com/maps/1febe4f7-524c-4c8c-95b7-ae9fe200a85f/style.json?key=iKtybRd7vbBhNcJy7yau';
	var map = new ol.Map({
		target: 'map',
		view: new ol.View({
			constrainResolution: true,
			center: ol.proj.fromLonLat(COORD),
			zoom: ZOOM
		})
	});
	olms.apply(map, styleJson);
	
	for (var i = 0; i < data.length; i++) {
		// add maker
		var pos = ol.proj.fromLonLat([data[i].geo[1],data[i].geo[0]]);
		var marker = new ol.Overlay({
			position: pos,
			positioning: 'center-center',
			element: document.getElementById('marker'+i),
			stopEvent: false
		});
		map.addOverlay(marker);
		// add label
		document.getElementById('label'+i).innerHTML = data[i].name;
		document.getElementById('label'+i).href = data[i].groupNum;
		document.getElementById('label'+i).addEventListener("click", chatRoom);
		var label = new ol.Overlay({
			position: pos,
			element: document.getElementById('label'+i)
		});
		map.addOverlay(label);
	}
});

function getJsonData() {
	return $.getJSON("book.json").then(function(json){
		return {
			json
		}
	});
}