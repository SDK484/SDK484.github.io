// html body

var dataEntry = 
		'<div class="micDiv"> \
			<div class="micCard card"> \
				<select class="form-select" aria-label="Default select example"> \
					<option selected>Kitchen-Fridge</option> \
					<option value="1">Kitchen-Store-1</option> \
					<option value="2">Kitchen-Store-2</option> \
					<option value="3">Kitchen-Table</option> \
				</select> \
			</div> \
			<button id="micBtn" type="button" class="micBtn btn btn-danger" onclick="postData()"><span class="oi oi-microphone"></span></button> \
		<div> \
		<div class="micRow row"> \
			<table id="table" class="table table-dark table-striped"> \
  			<thead> \
					<tr> \
						<th scope="col">Item</th> \
						<th scope="col">Quantity</th> \
						<th scope="col">Best Before</th> \
					</tr> \
  			</thead> \
				<tbody> \
				</tbody> \
			</table> \
		</div>';

// global variables

window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const recognition = new SpeechRecognition();
var icon;
var res;
var count = 0;
var boolSpeech = true;

var newRow;
var cellCount = 0;
var cellLimit = 2; // 3
var cellLimitCur = 0;

// initialize

function startSpeech() {
	if (annyang) {
		const commands = {
			'row': () => { addNewRow(); },
			'cell *term': (term) => { addNewCell(term); }
		};

		// Add our commands to annyang
		annyang.addCommands(commands);

  // Start listening.
  annyang.start();
	}
	
	//getSheetTabs();
	addNewRow();
}

// functions

function addNewRow() {
  var tableRef = document.getElementById("table");
 	newRow = tableRef.insertRow(-1);

  for (var i = 0; i <= cellLimit; i++) {
		let newCell = newRow.insertCell(i);
		let textArea = document.createElement('input');
		textArea.id = `cell${cellCount}${i}`;
		textArea.contenteditable = "true";
		textArea.className = "cellText";
		newCell.appendChild(textArea);
	}
	cellCount++;
}

var addNewCell = function(term) {
	console.log(term);
	var curRow = cellCount-1;
	var curCell = cellLimitCur;
	document.getElementById(`cell${curRow}${curCell}`).value = term;
	if (cellLimit == cellLimitCur) {
		cellLimitCur = 0;
	} else {
		cellLimitCur++;
	}
}

function getCellValues() {
	var arr = [];
	var table = document.getElementById('table');
	for (var r = 1, n = table.rows.length; r < n; r++) {
		var arrRow = []
		for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
				var input = table.rows[r].cells[c].childNodes;
				arrRow.push(input[0].value);
		}
		arr.push(arrRow);
	}
	return arr;
}

function postData() {
	var newCells = getCellValues();
	var airArr = [];
	for (var i in newCells) {
		airArr.push({
			"fields": {
				"Item": newCells[i][0],
				"Quantity": parseInt(newCells[i][1]),
				"Date": newCells[i][2]
			}
		});
	}
	
	var Airtable = require('airtable');
	var base = new Airtable({apiKey: 'keyRxbrIIcPFpfAHZ'}).base('appV3Ww0oyQkycpHN');
	
	base('Table').create(airArr, function(err, records) {
		if (err) {
			console.error(err);
			return;
		}
		records.forEach(function (record) {
			console.log(record.getId());
		});
	});
}

// https://github.com/TalAter/annyang