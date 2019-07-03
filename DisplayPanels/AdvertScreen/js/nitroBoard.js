// get google sheet data csv
$.ajax({
	url : "https://docs.google.com/spreadsheets/d/e/2PACX-1vQxfkv19ZrNCrewSYV2n1JCmagCCf2BBXJcpq1qnVDF-f3nq05nYwJgsE-2ZcbQAQNEsxK2KDu1kap9/pub?output=csv",
	/*"NitroBoard.csv",*/
	async: true,
	success : function(result) {
		// get vars data
		var data = [];
		var resArr = result.split(",");
		
		// cycle through and tidy up
		var sliceArr;
		for (var i = 3; i < resArr.length; i++) {
			 if (resArr[i] == "") {
					sliceArr = resArr.slice(3, i);
					break;
			 }
		} 
		
		// move all the good data across
		for (var d = 0; d < sliceArr.length; d = d + 3) {
			 data.push([sliceArr[d],sliceArr[d+1],sliceArr[d+2]]);
		}
		
		// get menu and add data
		var menu = document.getElementById("menu");
		var dash = "-";
		for (var i = 0; i < data.length-1; i++) {
			var drink = data[i][0].substring(1);
			var drinkLen = drink.length;
			var price = data[i][1];
			if (drink !== undefined) {
				// add new menu list
				var dataItem = document.createElement("p");
				dataItem.className = "tlt";
				var dashItem = dash.repeat(5);
				if (drinkLen <= 17) {
					var d = (17 - drink.length) + 3;
					dashItem += dash.repeat(d);
				}
				dataItem.innerHTML = drink+" "+dashItem+" "+price;
				menu.appendChild(dataItem);
			}
		}
				
		// animate text on screen
		$(function () {
			$('.tlt').textillate({
				in: { effect: 'tada' },
				out: { effect: 'flash', sync: true },
				loop: true
			});
		});

		// animate text on logo
		$(function () {
			$('.tltCoffee').textillate({
				initialDelay: 1000,
				in: { effect: 'wobble', sync: true, delay: 2000, },
				out: { effect: 'flip', sync: true, delay: 2000, },
				loop: true
			});
		});
				
	}
});