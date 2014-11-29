# Using valiteInput function from GlobalFunc.coffee
$("input[type=text]").on "keyup", ->
    validateInput "input[name=name]", 35
    validateInput "input[name=email]", 35
    validateInput "input[name=email-register]", 35
    validateInput "input[name=mobile]", 35
    return

$("input[type=password]").on "keyup", ->
    validateInput "input[name=password-register]", 35
    return
