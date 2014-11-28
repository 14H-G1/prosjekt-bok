# Using valiteInput function from GlobalFunc.coffee
$("input[type=text]").on "keyup", ->
    validateInput "input[name=name]", 35
    validateInput "input[name=email]", 35
    validateInput "input[name=mobile]", 35
    return

$("input[type=password]").on "keyup", ->
    validateInput "input[name=password]", 35
    validateInput "input[name=password-repeat]", 35
    return
