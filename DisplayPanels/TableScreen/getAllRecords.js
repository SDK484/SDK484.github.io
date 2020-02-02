var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://weddingport-46b9.restdb.io/rest/wedding",
  "method": "GET",
  "headers": {
    "content-type": "application/json",
    "x-apikey": "5e2df8dd4327326cf1c91c17",
    "cache-control": "no-cache"
  }
}

function exportToCsv(filename, rows) {
	var processRow = function (row) {
			var finalVal = '';
			for (var j = 0; j < row.length; j++) {
					var innerValue = row[j] === null ? '' : row[j].toString();
					if (row[j] instanceof Date) {
							innerValue = row[j].toLocaleString();
					};
					var result = innerValue.replace(/"/g, '""');
					if (result.search(/("|,|\n)/g) >= 0)
							result = '"' + result + '"';
					if (j > 0)
							finalVal += ',';
					finalVal += result;
			}
			return finalVal + '\n';
	};

	var csvFile = '';
	for (var i = 0; i < rows.length; i++) {
			csvFile += processRow(rows[i]);
	}

	var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
	if (navigator.msSaveBlob) { // IE 10+
			navigator.msSaveBlob(blob, filename);
	} else {
			var link = document.createElement("a");
			if (link.download !== undefined) { // feature detection
					// Browsers that support HTML5 download attribute
					var url = URL.createObjectURL(blob);
					link.setAttribute("href", url);
					link.setAttribute("download", filename);
					link.style.visibility = 'hidden';
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
			}
	}
}

$.ajax(settings).done(function (res) {
	var result = [];
	for (var i = 0; i < res.length; i++) {
		var row = [res[i].FullName, res[i].Email, res[i].Attending,
			res[i].DietReq, res[i].Starter, res[i].Main, res[i].Dessert];
		result.push(row);
	}
  //console.log(result);
	exportToCsv('export.csv', result);
});
