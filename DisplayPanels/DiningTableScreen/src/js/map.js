import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import MultiPoint from 'ol/geom/MultiPoint';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Circle as CircleStyle, Fill, Stroke, Text, Style } from 'ol/style';
import Draw from 'ol/interaction/Draw';
import fs from 'file-system';
import GeoData from '../../GeoData.json';

const styles = new Style({
	stroke: new Stroke({
		color: '#000000',
		width: 6
	}),
	fill: new Fill({
		color: 'rgba(0, 0, 0, 0)'
	}),
	text: new Text({
		font: '20px Calibri,sans-serif',
		placement: 'center',
		fill: new Fill({
			color: '#000'
		}),
		stroke: new Stroke({
			color: '#fff',
			width: 3
		})
	})
});

const source = new VectorSource({
	features: (new GeoJSON()).readFeatures(GeoData)
});

const layer = new VectorLayer({
	source: source,
	style: function(feature) {
		styles.getText().setText(feature.get('label'));
		return styles;
	}
});

const map = new Map({
	layers: [layer],
	target: 'map',
	view: new View({
		center: [0, 3000000],
		zoom: 2
	})
});

map.on("click", function(e) {
	map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
		const modal = document.getElementById("modal");
		modal.style.display = "block";
		document.getElementById("modalTitle").innerHTML = feature.get('label');
	})
});

/*
var typeSelect = document.getElementById('type');

var draw; // global so we can remove it later
function addInteraction() {
  var value = typeSelect.value;
  if (value !== 'None') {
    draw = new Draw({
      source: source,
      type: typeSelect.value
    });
    map.addInteraction(draw);
  }
}


// Handle change event.

typeSelect.onchange = function() {
  map.removeInteraction(draw);
  addInteraction();
};

addInteraction();

var saveGeo = document.getElementById('saveBtn');
saveGeo.onclick = function() {
	var features = layer.getSource().getFeatures();
	var featColl = new GeoJSON().writeFeatures(features);
	var txtArray = [];
	txtArray.push(JSON.stringify(featColl));
	console.log(featColl);
}
*/