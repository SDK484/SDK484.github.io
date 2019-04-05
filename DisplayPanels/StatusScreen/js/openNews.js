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
		var newsListTitle = document.getElementById("newsListTitle");
		var newsListDes = document.getElementById("newsListDes");
		dataArray.forEach(function(article) {
			//console.log(article);
			newsListTitle.innerHTML = "<b>"+article.title+"</b>";
			newsListDes.innerHTML = article.description;
		});
	});
}