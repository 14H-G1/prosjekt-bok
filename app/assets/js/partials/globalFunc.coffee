validateInput = (selector, lengthLimit) ->
    # Checks if the length of selector is over the limit,
    # * and responds with adding/removing error class
    if $(selector).val().length >= lengthLimit
        $(selector).addClass "input-error"
    else
        $(selector).removeClass "input-error"

    return
