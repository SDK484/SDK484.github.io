// access data
var OPENNEWS_API_KEY = '545a8bd72977413288b7de6e3fbead15';
var NEWS_DATA = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=' + OPENNEWS_API_KEY;

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
			<div class="newsSlides fade"> \
				<div class="boxPanelData"> \
					<div><b>'+article.title+'</b></div> \
					<br/> \
					<div>'+article.description+'</div> \
				</div> \
			</div>';
	});
	// cycle through news stories
	showSlidesNews();
});

// functions

// slide show
var slideIndexNews = 0;

function showSlidesNews() {
	var i;
	var slides = document.getElementsByClassName("newsSlides");
	var dots = document.getElementsByClassName("dotNews");
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";  
	}
	slideIndexNews++;
	if (slideIndexNews > slides.length) {slideIndexNews = 1}    
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndexNews-1].style.display = "block";  
	dots[slideIndexNews-1].className += " active";
	setTimeout(showSlidesNews, 8000); // Change image every 8 seconds
}
