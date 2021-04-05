// html body

var kitchenView = 
		'<div id="can"> \
			<canvas id="canvas"></canvas> \
		</div> \
		<div id="spread"> \
			<iframe id="spreadFram" class="spreadFram" src="https://airtable.com/embed/shrjhfVBWQ1gqZJFo?backgroundColor=purple" /> \
		</div>';

// global variables

var can;
var ctx;
var canFab;
var lineArr;
var lineColor;
var objArr;
var doorArr;
var doorColor;

// initialize

function startView() {
	can = document.getElementById('canvas');
	ctx = can.getContext('2d');

	initialize();
	
	canFab = new fabric.Canvas('canvas');

	lineArr = data.outline.path;
	lineColor = data.outline.color; 
	for (var i = 0; i < lineArr.length; i++) {
		addLine(lineArr[i], lineColor);
	}

	objArr = data.objects;
	objArr.forEach(function(obj) {
		addRect(obj.path, obj.color, obj.name);
		var textArr = [(obj.path[0]+5),(obj.path[1]+5)];
		addText(obj.name, textArr, obj.color);
	});

	doorArr = data.door.path;
	doorColor = data.door.color;
	for (var i = 0; i < doorArr.length; i++) {
		addLine(doorArr[i], doorColor);
	}
	
	canFab.on('mouse:down', (options) => {
		if (options.target.type !== null) {
			if (options.target.type === "rect") {
				//getTableResults(options.target.name);
				const src = document.getElementById('spreadFram').src;
				//const srcArr = src.split("gid=");
				switch(options.target.name) {
					case "fridge":
						document.getElementById('spreadFram').src = "https://airtable.com/embed/shrjhfVBWQ1gqZJFo?backgroundColor=purple";
						break;
					case "store-1":
						document.getElementById('spreadFram').src = "https://airtable.com/embed/shrdMMdskeo09T04z?backgroundColor=red";
						break;
					default:
						document.getElementById('spreadFram').src = "https://airtable.com/embed/shrjhfVBWQ1gqZJFo?backgroundColor=purple";
						break;
				}
			}
		}
	});
	
	canFab.hoverCursor = 'pointer';
	canFab.selection = false;
	canFab.forEachObject(function(o) {
		o.selectable = false;
	});

	//	zoomIt(2.5, canFab);
	//	canvas.setZoom(2);
	//	canvas.setWidth(window.innerWidth*0.50 * canvas.getZoom());
	//	canvas.setHeight(window.innerHeight*0.92 * canvas.getZoom());	
}

// functions

function initialize() {
	// window.addEventListener('resize', resizeCanvas, false);
	resizeCanvas();
}
	
function resizeCanvas() {
	can.width = window.innerWidth*0.99;
	can.height = window.innerHeight*0.96;
}

function addLine(arr, color) {
	canFab.add(new fabric.Line(arr, {
		stroke: color,
		selectable: false
	}));
}

function addRect(arr, color, name) {
	canFab.add(new fabric.Rect({
		left: arr[0],
		top: arr[1],
		width: arr[2],
		height: arr[3],
		stroke: color,
		fill: "rgba(0,0,0,0)",
		selectable: false,
		name: name
	}));
}

function addText(name, arr, color) {
	canFab.add(new fabric.Text(name, { 
		left: arr[0],
		top: arr[1], 
		fill: color,
		fontSize: 12,
		selectable: false
	}));
}


// canFab.off('mouse:move', () => {});

// https://miniextensions.com/airtable-basic-editor/