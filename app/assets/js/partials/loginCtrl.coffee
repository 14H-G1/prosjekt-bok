# Using valiteInput function from GlobalFunc.coffee
$("input[name=name]").on "keyup", ->
    validateInput "input[name=name]", 35
    return

$("input[name=email]").on "keyup", ->
    validateInput "input[name=email]", 55
    return

$("input[name=email-register]").on "keyup", ->
    validateInput "input[name=email-register]", 55
    return

$("input[name=mobile]").on "keyup", ->
    validateInput "input[name=mobile]", 9
    return

$("input[type=password]").on "keyup", ->
    validateInput "input[name=password-register]", 35
    return
