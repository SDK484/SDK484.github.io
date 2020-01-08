$.getJSON("./table.json", function(tab) {
	
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
	// first section
	var tables = tab.Tables;
	var tablesId = document.getElementById("tables");
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
		paraHeader.style.top = "10px";
		paraHeader.innerHTML = tables[i][0];
		if (i % 2 === 0) {
			paraHeader.className = "animated infinite tada slower delay-2s";
		} else {
			paraHeader.className = "animated infinite tada slower delay-4s";
		}
		paraHeader.style.fontSize = "1em";
		col.appendChild(paraHeader);
		// content
		for (var d = 1; d < tables[i].length;) {
			var paraContent = document.createElement("div");
			paraContent.style.position = "relative";
			paraContent.style.top = "20px";
			var div1 = document.createElement("div");
			var div2 = document.createElement("div");
			div1.innerHTML = tables[i][d];
			div2.innerHTML = tables[i][d+1];
			div1.style.fontSize = "1em";
			div2.style.fontSize = "1em";
			div1.style.float = "left";
			div2.style.float = "left";
			div1.style.paddingLeft = "15px";
			div2.style.paddingLeft = "15px";
			paraContent.appendChild(div1);
			paraContent.appendChild(div2);
			col.appendChild(paraContent);
			d = d + 2;
		}
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
		// header
		var paraHeader = document.createElement("div");
		paraHeader.style.position = "relative";
		paraHeader.style.top = "10px";
		paraHeader.innerHTML = tables[i][0];
		if (i % 2 === 0) {
			paraHeader.className = "animated infinite tada slower delay-2s";
		} else {
			paraHeader.className = "animated infinite tada slower delay-4s";
		}
		paraHeader.style.fontSize = "1em";
		col.appendChild(paraHeader);
		// content
		for (var d = 1; d < tables[i].length;) {
			var paraContent = document.createElement("div");
			paraContent.style.position = "relative";
			paraContent.style.top = "20px";
			var div1 = document.createElement("div");
			var div2 = document.createElement("div");
			div1.innerHTML = tables[i][d];
			div2.innerHTML = tables[i][d+1];
			div1.style.fontSize = "1em";
			div2.style.fontSize = "1em";
			div1.style.float = "left";
			div2.style.float = "left";
			div1.style.paddingLeft = "15px";
			div2.style.paddingLeft = "15px";
			paraContent.appendChild(div1);
			paraContent.appendChild(div2);
			col.appendChild(paraContent);
			d = d + 2;
		}
		row.appendChild(col);
	}
	tablesId.appendChild(row);
});