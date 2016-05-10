var reports = [];

// fetch all resports from server, async
var getAllReports = function(url, callback) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState === 4 && request.status === 200) {
			callback(request.responseText);
		}
	}
	request.open('GET', url, true);
	request.send(null);
}

// get reports when page loads
window.addEventListener('load', function(event) {
	getAllReports('/reports', showAllReports)
})

// helper function for sorting the reports
var sortReportsDescending = function(reportsArray) {
	reports.sort(function(a, b) {
		if (Date.parse(b.created) > Date.parse(a.created)) {
			return 1;
		}
	});
}

// helper function for displaying elements
var appendReport = function(reportObj) {
	var parentEl = document.createElement('div');
	parentEl.innerHTML = reportObj.title;
	document.body.appendChild(parentEl);

}

// store, sort, and display reports in the browser
var showAllReports = function(responseTextJSON) {
	var responsesArray = JSON.parse(responseTextJSON);
	// store reports in global array
	for (var i = 0; i < responsesArray.length; i++) {
		reports.push(responsesArray[i]);
	}

	// sort reports in global array
	sortReportsDescending(reports);

	// display reports from global array
	for (var i = 0; i < reports.length; i++) {
		appendReport(reports[i]);
	}
	console.log("reports", reports)
	for (var i = 0; i < reports.length; i++) {
		console.log("reports[i].created", reports[i].created)

	}
}

