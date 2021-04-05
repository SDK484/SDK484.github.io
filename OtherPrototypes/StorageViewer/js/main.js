// on start
if (contain == "view") {
  document.getElementById("container").innerHTML = kitchenView;
	startView();
} else if (contain == "entry") {
	document.getElementById("container").innerHTML = dataEntry;
	startSpeech();
} else {
	// additional
}