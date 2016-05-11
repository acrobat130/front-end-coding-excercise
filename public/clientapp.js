var reports = [];
var filteredReports = [];

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

////////////////////////////////////////////////////////////

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
	var el = document.createElement('div');
	el.innerHTML = reportObj.title;
	el.onclick = function() {
		document.getElementById('reportTitle').innerHTML = reportObj.title;
		document.getElementById('reportDetails').innerHTML = reportObj.body;
	}
	document.getElementById('reportList').appendChild(el);

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

	// store in filteredReports initially also
	filteredReports = reports;

	// display reports from global array
	for (var i = 0; i < reports.length; i++) {
		appendReport(reports[i]);
	}
	console.log("reports", reports)
	for (var i = 0; i < reports.length; i++) {
		console.log("reports[i].created", reports[i].created)
	}
}

////////////////////////////////////////////////////////////
var filterInput = document.getElementById('search');

filterInput.onkeyup = function() {

	var filterInputValue = filterInput.value.toLowerCase();
	// empty filtered reports array
	filteredReports = [];
	// remove all reports from list
	var reportDiv = document.getElementById('reportList')
	while (reportDiv.firstChild) {
		reportDiv.removeChild(reportDiv.firstChild);
	}

	for (var i = 0; i < reports.length; i++) {
		var containedInTitle = reports[i].title.toLowerCase().includes(filterInputValue);
		var containedInBody = reports[i].body.toLowerCase().includes(filterInputValue);

		if (containedInTitle || containedInBody) {
			filteredReports.push(reports[i]);
		}
	}

	// display reports from filtered reports array
	for (var i = 0; i < filteredReports.length; i++) {
		appendReport(filteredReports[i]);
	}
	console.log("filteredReports", filteredReports)
}



