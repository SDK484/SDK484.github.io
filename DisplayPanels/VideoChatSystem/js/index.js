// flash square buttons
var squBtns = document.getElementsByClassName("cell");
var numArr = [];

randFind();
cycleThroughBtns();

function cycleThroughBtns() {
	clear();
	for (var i = 0; i < squBtns.length; i++) {
		for (var d = 0; d < 16; d++) {
			if (i === numArr[d]) {
				squBtns[i].classList.add("fade");
				squBtns[i].style.backgroundColor = "#42ebf4";
				break;
			}
		}
	}
	randFind();
	setTimeout(cycleThroughBtns, 4000); // Change every 4 seconds
}

function randFind() {
	numArr = [];
	for (var i = 0; i < 8; i++) {
		var num = Math.floor(Math.random() * 16) + 0;
		numArr.push(num);
	}
	for (var i = 0; i < 8; i++) {
		var num = Math.floor(Math.random() * 16) + 16;
		numArr.push(num);
	}
}

function clear() {
	for (var i = 0; i < squBtns.length; i++) {
		squBtns[i].classList.remove("fade");
		squBtns[i].style.backgroundColor = "transparent";
	}
}

// functions

function reload() {
	var url = window.location.href;
	console.log(url);
	var urlNew = url.substring(0, url.lastIndexOf("#"));
	window.location.replace(urlNew);
}