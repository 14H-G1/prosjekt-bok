# Using valiteInput function from GlobalFunc.coffee
$("input[name=name]").on "keyup", ->
    validateInput "input[name=name]", 36
    return

$("input[name=email]").on "keyup", ->
    validateInput "input[name=email]", 56
    return

$("input[name=email-register]").on "keyup", ->
    validateInput "input[name=email-register]", 56
    return

$("input[name=mobile]").on "keyup", ->
    validateInput "input[name=mobile]", 9
    return

$("input[type=password]").on "keyup", ->
    validateInput "input[name=password-register]", 46
    return
