validateInput = (selector, lengthLimit) ->
	# Checks if the length of selector is over the limit,
	# and responds with adding/removing error class
	if $(selector).val().length >= lengthLimit
		$(selector).addClass "input-error"
	else
		$(selector).removeClass "input-error"
	return

$("input[type=text]").on "keyup", ->
	validateInput "input[name=title]", 60
	validateInput "input[name=publishDate]", 4
	validateInput "input[name=price]", 4

$(".fa").click ->
	# TODO: Move to profile
	$(this).toggleClass "toggled"

$("#send-book").click ->
	alert "Ikke implementert."
