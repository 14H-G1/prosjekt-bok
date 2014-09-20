<!DOCTYPE html>
<html lang="no">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>ARV</title>
	<link rel="stylesheet" href="css/style.css">
</head>
<body>

	<div class="head-wrap">
		<div class="head-elements">
			<h1>ARV</h1>
			<a id="button" href="/index.php">tilbake</a>
			<a id="button" href="/sok.php">søk</a>
		</div>
	</div>

	<div class="main-wrap">
		
		<section class="row">

			<div class="container">
				<div id="book-img">
					<img src="http://dummyimage.com/160x215/f0f0f0/000000&text=bok" alt="">
				</div>

				<div id="book-info">
					<input type="text" placeholder="Tittel" id="title"></input>
					<input type="text" placeholder="Utgitt" id="release"></input>
					<input type="text" placeholder="Pris" id="price"></input>
				</div>
				
				<a id="button" href="#">legg ut for salg</a>

			</div>

			<!--
			<div id="results">Your captured image will appear here...</div>
			<div id="my_camera"></div>
			<form>
				<input type=button value="Take Large Snapshot" onClick="take_snapshot()">
			</form>
			-->
		</section>

	</div>

	<footer>
		<p>Copyright &copy; G1</p>
	</footer>
	
	<!--
	<script type="text/javascript" src="js/webcam.js"></script>
	<script type="text/javascript" src="js/webcam-settings.js"></script> -->
</body>
</html>