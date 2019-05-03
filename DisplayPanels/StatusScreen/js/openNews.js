// start-up

var OPENNEWS_API_KEY = '545a8bd72977413288b7de6e3fbead15';
var NEWS_DATA = 'http://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=' + OPENNEWS_API_KEY;

// functions

function addNewsBox() {
	// get news data
	$.getJSON(NEWS_DATA, function(data) {
		// cycle through each article 
		// and pull out title and 
		// description to display
		var dataArray = data.articles;
		var newsBoxFeed = document.getElementById("newsBoxFeed");
		dataArray.forEach(function(article) {
			//console.log(article);
			newsBoxFeed.innerHTML += ' \
				<div class="mySlides fade"> \
					<div class="boxPanelData"> \
						<div><b>'+article.title+'</b></div> \
						<br/> \
						<div>'+article.description+'</div> \
					</div> \
				</div>';
		});
		//
		showSlides();
	});
}

// slide show
var slideIndex = 0;

function showSlides() {
	var i;
	var slides = document.getElementsByClassName("mySlides");
	var dots = document.getElementsByClassName("dotNews");
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";  
	}
	slideIndex++;
	if (slideIndex > slides.length) {slideIndex = 1}    
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex-1].style.display = "block";  
	dots[slideIndex-1].className += " active";
	setTimeout(showSlides, 8000); // Change image every 8 seconds
}