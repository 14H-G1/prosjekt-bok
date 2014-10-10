// Disable scroll zooming and bind back the click event
var onMapMouseleaveHandler = function (event) {
    var that = $(this);

    that.on('click', onMapClickHandler);
    that.off('mouseleave', onMapMouseleaveHandler);
    that.find('iframe').css("pointer-events", "none");
}

var onMapClickHandler = function (event) {
    var that = $(this);

    // Disable the click handler until the user leaves the map area
    that.off('click', onMapClickHandler);

    // Enable scrolling zoom
    that.find('iframe').css("pointer-events", "auto");

    // Handle the mouse leave event
    that.on('mouseleave', onMapMouseleaveHandler);
}

// Enable map zooming with mouse scroll when the user clicks the map
$('.maps').on('click', onMapClickHandler);

$('#open-login').click(function(e) {
    $('#login-modal').lightbox_me({
        centered: true,
        onLoad: function() {
            $('#login-modal-form').find('input:first').focus();
        }
    });
    e.preventDefault();
});

$('#open-upload').click(function(e) {
    $('#upload-modal').lightbox_me({
        centered: true
    });
    e.preventDefault();
});

$(function() {
    /* Check input fields */
    $("input[type=text]").on('keyup', function() {
        console.log($(this).val());

        /* Validating inputs */
        validateInput("input[name=title]", 45);
        validateInput("input[name=publishDate]", 45);
        validateInput("input[name=price]", 45);
        validateInput("input[name=condition]", 45);
    });

    /* Register when contact icons clicked */
    $(".fa").click(function() {
      $(this).toggleClass("toggled");
    });

    /* Send book info to server */
    $("#send-book").click(function() {
        alert('Not yet implemented');
    });

    function validateInput(selector, lengthLimit) {
        /* Checks if the length of selector is over the limit,
         * and responds with adding/removing error class */
        if ($(selector).val().length > lengthLimit)
            $(selector).addClass("input-error");
        else
            $(selector).removeClass("input-error");
    }

    /* A not working post json function */
    function postJSON(JSONData) {
        $.ajax({
            type: 'POST',
            url: '/sell-book',
            contentType:"application/json; charset=utf-8",
            dataType: "json",
            data: JSONData,
            success: function(data) {
                alert("Json POST to server");
            }
        });
    }
});

Webcam.set({
	// live preview size
	width: 160,
	height: 215,
	
	// device capture size
	//dest_width: 160,
	//dest_height: 215,
	
	// final cropped size
	//crop_width: 160,
	//crop_height: 215, 
	
	// format and quality
	image_format: 'jpeg',
	jpeg_quality: 90
});
	
Webcam.attach('#my-camera');

function take_snapshot() {
	// take snapshot and get image data
	Webcam.snap( function(data_uri) {
		// display results in page
		divCamera = document.getElementById("my-camera");
		divCamera.style.display = "none";
		document.getElementById('results').innerHTML = 
			'<img style="height: 215; width: 160; position: absolute" src="'+data_uri+'"/>';
	} );
}