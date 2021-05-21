const fetch = require("node-fetch");
const jsdom = require("jsdom");
const puppeteer = require("puppeteer");
const fs = require('fs'),
request = require('request');

// trending gifs
const urlTrend = "https://gfycat.com/gifs/tag/trending";
// game clip gifs
const urlGame = "https://gfycat.com/gifs/search/rainbow+six+seige";
// NI news headlines
const urlNews = "https://www.bbc.co.uk/news/northern_ireland";
// Weather - Bangor
const urlWeather = "https://www.bbc.co.uk/weather/2655984";


// functions

const download = (uri, filename, callback) => {
	request.head(uri, function(err, res, body){
		console.log('content-type:', res.headers['content-type']);
		console.log('content-length:', res.headers['content-length']);

		request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	});
};

const getTopGifs = (html, num) => {
	const dom = new jsdom.JSDOM(html);
	//const uri = dom.window.document.querySelector("img").getAttribute("src");
	const list = dom.window.document.querySelectorAll("img");

	let count = 0;
	let listReturn = [];
	list.forEach((item) => {
		if (count >= num) {
			return;
		}
		const str = item.getAttribute('src');
		if (str.includes('http')) {
			listReturn.push(str);
			count++;
		}
	});
	
	return listReturn;
}

async function getUrlImgs(url, type) { 
//	const trend = await fetch(urlTrend);
//	console.log(trend.text())
	await fetch(url).then(function (response) {
		// The API call was successful!
		return response.text();
	}).then(function (html) {
		
		const gifs = getTopGifs(html, 10);
		console.log(gifs)
		let count = 1;
		gifs.forEach((item) => {
			download(item, `data/${type}_${count}.gif`, function() {
				console.log(`done ... ${type} ... ${count}`);
			});
			count++;
		});
		
	}).catch(function (err) {
		// There was an error
		console.warn('Something went wrong.', err);
	});
}

const captureWeb = async (url, file, width, height, scrollD) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
	await page.evaluate((_,scrollD) => {
		console.log(scrollD);
		window.scrollBy(0, 200);
	});
	await page.setViewport({
		width: width,
		height: height
	});
  await page.screenshot({ path: `./data/${file}.png` });
	console.log(`done ... ${file}`);
  await browser.close();
};


getUrlImgs(urlGame, "game");
getUrlImgs(urlTrend, "trend");

captureWeb(urlWeather, "weather", 800, 600, 200);
captureWeb(urlNews, "news", 1350, 800, 400);





