$.getJSON("./table.json", function(tab) {
	
	// get imgs
	var imgs = tab.Imgs;
	// get Top Table
	var topTable = tab.TopTable;
	var topId = document.getElementById("topTable");
	// create elements
	// header
	var paraHeader = document.createElement("div");
	paraHeader.innerHTML = "TOP TABLE - THE AVA";
	paraHeader.style.fontSize = "1.4em";
	paraHeader.style.position = "relative";
	paraHeader.style.top = "10px";
	topId.appendChild(paraHeader);
	// content
	var paraContent = document.createElement("div");
	paraContent.style.fontSize = "1.1em";
	paraContent.style.position = "relative";
	paraContent.style.top = "25px";
	var paraStr = "";
	for (var i = 0; i < topTable.length; i++) {
		paraStr += (topTable[i]+"&nbsp; &nbsp; &nbsp;");
	}
	paraContent.innerHTML = paraStr;
	topId.appendChild(paraContent);
	
	// get Tables
	var tables = tab.Tables;
	var tablesId = document.getElementById("tables");
	// first section
	// row
	var row = document.createElement("div");
	row.className = "row";
	for (var i = 0; i <= 3; i++) {
		// column
		var col = document.createElement("div");
		col.className = "column";
		// header
		var paraHeader = document.createElement("div");
		paraHeader.style.position = "relative";
		paraHeader.style.top = "17px";
		paraHeader.innerHTML = tables[i][0];
		if (i % 2 === 0) {
			paraHeader.className = "animated infinite tada slower delay-2s";
		} else {
			paraHeader.className = "animated infinite tada slower delay-4s";
		}
		paraHeader.style.fontSize = "1em";
		col.appendChild(paraHeader);
		// img
		var img = document.createElement("img");
		img.className = "img";
		img.src = "img/"+imgs[i];
		img.style.border = "2px solid gold";
		col.appendChild(img);
		// content
		var tabContent = document.createElement("table");
		tabContent.style.width = "90%";
		tabContent.style.paddingLeft = "10%";
		for (var d = 1; d < tables[i].length;) {
			var tabRow = document.createElement("tr");
			var tabCell1 = document.createElement("td");
			var tabCell2 = document.createElement("td");
			tabCell1.innerHTML = tables[i][d];
			tabCell2.innerHTML = tables[i][d+1];
			tabRow.appendChild(tabCell1);
			tabRow.appendChild(tabCell2);
			tabContent.appendChild(tabRow);
			d = d + 2;
		}
		col.appendChild(tabContent);
		row.appendChild(col);
	}
	tablesId.appendChild(row);
	
	// second section 
	// row
	var row = document.createElement("div");
	row.className = "row";
	for (var i = 4; i <= 7; i++) {
		// column
		var col = document.createElement("div");
		col.className = "column";
		col.style.height = "26vh";
		// header
		var paraHeader = document.createElement("div");
		paraHeader.style.position = "relative";
		paraHeader.style.top = "17px";
		paraHeader.innerHTML = tables[i][0];
		if (i % 2 === 0) {
			paraHeader.className = "animated infinite tada slower delay-2s";
		} else {
			paraHeader.className = "animated infinite tada slower delay-4s";
		}
		paraHeader.style.fontSize = "1em";
		if (i === 6) {
			paraHeader.style.fontSize = "0.85em";		
		}
		col.appendChild(paraHeader);
		// img
		var img = document.createElement("img");
		img.className = "img";
		img.src = "img/"+imgs[i];
		img.style.border = "2px solid gold";
		col.appendChild(img);
		// content
		var tabContent = document.createElement("table");
		tabContent.style.width = "90%";
		tabContent.style.paddingLeft = "10%";
		for (var d = 1; d < tables[i].length;) {
			var tabRow = document.createElement("tr");
			var tabCell1 = document.createElement("td");
			var tabCell2 = document.createElement("td");
			tabCell1.innerHTML = tables[i][d];
			tabCell2.innerHTML = tables[i][d+1];
			tabRow.appendChild(tabCell1);
			tabRow.appendChild(tabCell2);
			tabContent.appendChild(tabRow);
			d = d + 2;
		}
		col.appendChild(tabContent);
		row.appendChild(col);
	}
	tablesId.appendChild(row);
});