// ************************** start-up  ****************************************

// add info details
var infoDetailsDate = document.getElementById("infoDetailsDate");
// date
var todayDate = new Date();
var dd = String(todayDate.getDate()).padStart(2, '0');
var mm = String(todayDate.getMonth() + 1).padStart(2, '0');
var yyyy = todayDate.getFullYear();
todayDate = dd + '/' + mm + '/' + yyyy;
infoDetailsDate.innerHTML += " - Date: " + todayDate;
// time
startTime();

// 3 second delay
setTimeout( function() {
	// add boxes
	addWeatherBox();
	addNewsBox();
	addMapBox();
}, 3000);

//******************************************************************************

function startTime() {
	var todayTime = new Date();
	var h = todayTime.getHours();
	var m = todayTime.getMinutes();
	var s = todayTime.getSeconds();
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById("infoDetailsTime").innerHTML = " - Time: " + h + ":" + m + ":" + s;
	var t = setTimeout(startTime, 500);
}

function checkTime(i) {
  if (i < 10) {
		i = "0" + i;
	}
  return i;
}