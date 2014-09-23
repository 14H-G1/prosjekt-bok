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