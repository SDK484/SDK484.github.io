import Airtable from 'airtable';

const base = new Airtable({
	apiKey: 'keyRxbrIIcPFpfAHZ'
}).base('appCIMZyL9MqgQAhg');

// get records

base('Imported table').select({
	view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
	records.forEach(function(record) {
		console.log('Retrieved', record.get('Orders'));
	});
	fetchNextPage();
}, function done(err) {
	if (err) { console.error(err); return; }
});

// update records

document.getElementById('submit').onclick = function() {
	// get table
	const modalTable = document.getElementById("modalTitle").innerHTML;
	const tableNum = modalTable.split(" ")[1];
	const tableName = "Imported table";
	const table = base.table(tableName);
	const tableStr = "{Table}="+tableNum;
	table.select({
		"filterByFormula": tableStr
	}).firstPage((err, results) => {
		if (err) {
			// handle err;
			throw err;
		}
		
		// get order details
		const orderList = ["beer1", "beer2", "beer3", "cider1", "cider2", "wineSpirit1", "wineSpirit2", "wineSpirit3"];
		const orderNameList = ["Heineken", "Blue Moon", "Estrella", "Magners", "Strongbow", "Bottle of Red", "Bottle of White", "Vodka Shot"];
		let order = "";
		for (let i = 0; i < orderList.length; i++) {
			const orderNum = document.getElementById(orderList[i]).value;
			const orderName = orderNameList[i];
			if (orderNum) {
				order += orderName+" x "+orderNum+"\n";
			}
		}
		// results
		if (order !== null) {
			const record = results[0];
			const recordId = record.id;
			table.update(recordId, {
				"Orders": order
				//"Bill": 
			}).then((result) => {
				// handle final result
				// console.log(result);
			}).catch((err) => {
				// handle error
			})
		}
	});
}