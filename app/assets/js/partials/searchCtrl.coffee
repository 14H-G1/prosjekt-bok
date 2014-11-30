searchAPI = (what) ->
    request = $.ajax (
        url: "/api/books/list"
        type: "GET"
        dataType: "json"
    )

    request.done (msg) ->
        alert jQuery.parseJSON(msg)

    request.fail (jqXHR, textStatus) ->
        return "Request failed: " + textStatus

$('input[name=search]').on "keyup", (event) ->
    that = $(this).val()

    if that == '' then return false
    if event.keyCode == 13 then window.location.href = "/search/" + that.replace(/\ /g, '-')

    results = []
    res = searchAPI that

    results.push book for book in res when book.title.indexOf(that) > -1

    console.log results
