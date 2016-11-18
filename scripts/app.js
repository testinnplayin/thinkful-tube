var endpoint = 'https://www.googleapis.com/youtube/v3/search';

function handleAJAX() {
	var params = {
		url : endpoint,
		data : {
			part: 'snippet',
			key : 'AIzaSyDc-tVAlpo1tSPmdnJhMz23iCp0U9fqZyY',
			q : 'goldfish',
		},
		dataType : 'jsonp',
		type : 'GET'
	};
	var data = $.ajax(params)
	.done(function(data) {
		console.log("Successsss!");
		console.log(data);
	})
	.fail(function(err) {
		console.log("Denied!");
		console.log(err);
	})
	.always(function() {
		console.log("Completed");
	});
}

$(document).ready(handleAJAX());

