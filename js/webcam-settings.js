Webcam.set({
	// live preview size
	width: 320,
	height: 240,
	
	// device capture size
	dest_width: 640,
	dest_height: 480,
	
	// final cropped size
	crop_width: 480,
	crop_height: 480,
	
	// format and quality
	image_format: 'jpeg',
	jpeg_quality: 90
});
	
Webcam.attach( '#my_camera' );

function take_snapshot() {
	// take snapshot and get image data
	Webcam.snap( function(data_uri) {
		// display results in page
		document.getElementById('results').innerHTML = 
			'<h2>Here is your large image:</h2>' + 
			'<img src="'+data_uri+'"/>';
	} );
}