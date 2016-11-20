var endpoint = 'https://www.googleapis.com/youtube/v3/search';
var embedURL = 'https://www.youtube.com/embed/';

var lightboxTemplate = (
		'<div id="lightbox" class="modal fade" tabindex="-1" role="dialog">'
			+ '<div class="modal-dialog">'
				+ '<div class="modal-content">'
					+ '<div class="modal-header">'
						+ '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
					+ '</div>'
					+ '<div class="modal-body">' + 
						+ '<iframe height="315" width="560" src="#" allowfullscreen></iframe>'
					+ '</div>'
				+ '</div>'
			+ '</div>'
		+ '</div>'
);

//display functions

function renderThumbnails(data) {
	var result = '';
	var lng = data.items.length;

	if (lng > 0) {
		var result = '';

		for (var i = 0; i < lng; i++) {
			result += '<div class="col-xs-12 col-md-6 col-lg-4">'
				+ '<a class="thumbnail js-trigger" data-toggle="modal" data-target="#lightbox" href="#" title="' 
				+ data.items[i].snippet.title + '" value="' + data.items[i].id.videoId + '">'
				+ '<img class="img-responsive video-thumbs" src="' + data.items[i].snippet.thumbnails.medium.url + '" alt="image of video"></a>'
				+ '</div>';
		}
	} else {
		result += '<div class="col-xs-12">'
					+ '<a href="#" class="thumbnail" title="no results"><img src="http://www.hardwickagriculture.org/blog/wp-content/uploads/placeholder.jpg" alt="placeholder"></a>'
				+ '</div>';
	}

	$('.js-row').html(result);
}

//AJAX call function

function handleAJAX(query) {
	var params = {
		url : endpoint,
		data : {
			part: 'snippet',
			key : 'AIzaSyDc-tVAlpo1tSPmdnJhMz23iCp0U9fqZyY',
			q : query,
		},
		dataType : 'jsonp',
		type : 'GET'
	};

	$.ajax(params, query)
	.done(function(data) {
		console.log("Successsss!");
		console.log(data);
		
		renderThumbnails(data);
		handleLightboxEvent();
	})
	.fail(function(err) {
		console.log("Denied!");
		console.log(err);
		var errMsg = "<p>Oops something went wrong! " + err + "</p>";
		$('.js-row').html(errMsg);
	})
	.always(function() {
		console.log("Completed");
	});
}


//action functions

function getValue() {
	var search = $('#search-term').val();
	return search;
}

function doActions(e) {
	e.preventDefault();
	$('.js-row').empty();
	var query = getValue();
	console.log('The query value is ' + query);
	handleAJAX(query);
}



//event handlers

function handleLightboxEvent() {
	

	$('.js-trigger').click(function() {
		var address = $(this).val();
		console.log(address);

		var embedURL = "https://www.youtube.com/embed/" + address + "?autoplay=0&controls=2";

	});
}

function handleSubmit() {

	$('.js-search-btn').click(function(e) {
		doActions(e);	
	});

	$('#search-term').keydown(function(e) {
		var enterKey = 13;

		if (e.which === enterKey) {
			doActions(e);
		}
	});
}

$(document).ready(handleSubmit);

