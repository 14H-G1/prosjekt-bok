validateInput = (selector, lengthLimit) ->
	# Checks if the length of selector is over the limit,
	# * and responds with adding/removing error class
	if $(selector).val().length > lengthLimit
		$(selector).addClass "input-error"
	else
		$(selector).removeClass "input-error"
	return

readURL = (input) ->
	if input.files and input.files[0]
		reader = new FileReader()
		reader.onload = (e) ->
			$("#image-preview").attr "src", e.target.result
			return

		reader.readAsDataURL input.files[0]
	return

$("input[type=text]").on "keyup", ->
	console.log $(this).val()
	validateInput "input[name=title]", 60
	validateInput "input[name=publishDate]", 4
	validateInput "input[name=price]", 4
	return

$(".fa").click ->
	$(this).toggleClass "toggled"
	return

$("#send-book").click ->
	alert "Ikke implementert."
	return

$("#inputImage").change ->
	readURL this
	$("#open-upload").hide()
	$("#image-preview").css "display", "inline-block"
	$("#second-image").css "display", "inline-block"
	return
