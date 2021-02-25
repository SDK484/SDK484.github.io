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
		width: { min: 640, ideal: 1920 },
		height: { min: 400, ideal: 1080 },
		aspectRatio: { ideal: 1.7777777778 }
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


