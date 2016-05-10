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

// store and display reports in the browser
var showAllReports = function(responseText) {
	console.log("responseText", responseText)
	reports.push(responseText);

}