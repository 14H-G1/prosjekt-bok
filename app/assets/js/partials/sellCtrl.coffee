isLoggedIn = ->
	request = $.ajax (
		url: "/users/isloggedin"
		type: "GET"
	)

	request.done (res) ->
		if res == 1 then return true else return false

	request.fail (jqXHR, textStatus) ->
		return false

$('#publish').click ->
	if isLoggedIn == true then window.location.href = "/publish"
	else swal
			title: "Ikke logget inn!"
			text: "Du må være innlogget for å legge ut en bok, vil du gå til innloggingssiden?"
			type: "error"
			showCancelButton: true
			cancelButtonText: "Avbryt"
			confirmButtonColor: "#60BC7B"
			confirmButtonText: "Gå til innloggingssiden"
			closeOnConfirm: false
		, ->
			window.location.href = "/login"
			return

# Using valiteInput function from GlobalFunc.coffee
$("input[name=title]").on "keyup", ->
	validateInput "input[name=title]", 60
$("input[name=publishDate]").on "keyup", ->
	validateInput "input[name=publishDate]", 4
$("input[name=price]").on "keyup", ->
	validateInput "input[name=price]", 4

$(".fa").click ->
	# If contact method is selected, change color
	$(this).toggleClass "toggled"
	return
