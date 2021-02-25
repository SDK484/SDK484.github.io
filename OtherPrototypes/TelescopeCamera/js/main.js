var count = 0;
var video = document.getElementById("video");

document.getElementById("container").addEventListener("click", function() {
	document.getElementById("video").className = "";
	switch (count) {
		case 1:
			document.getElementById("video").className = "flip1";
			count++;
		break;
		case 2:
			document.getElementById("video").className = "flip2";
			count++;
		break;
		case 3:
			document.getElementById("video").className = "flip3";
			count = 0;
		break;
		default:
			count++;
		break;
	}
});

var constraints = {
	audio: false,
	video: {
		width: { min: 1280, ideal: 1920 },
		height: { min: 720, ideal: 1080 },
		facingMode: 'environment'
	}
}

navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
	/* use the stream */
	video.srcObject = stream;
	video.play();
})
.catch(function(err) {
	/* handle the error */
});


