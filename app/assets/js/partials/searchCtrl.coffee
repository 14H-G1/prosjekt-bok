searchAPI = (term) ->
    request = $.ajax (
        type: "GET"
        url: "/api/books"
        dataType: "json"
        success: (data) ->
            res = [] = for book in data then book
            books = []
            for item in res
                if item.title.toLowerCase().indexOf(term.toLowerCase()) > -1
                    books.push
                        title: item.title
                        authors: item.authors
                        price: item.price

            updateBooks books
            return
    )

updateBooks = (books) ->
    $('.books').html ''
    bookContainer = ''

    for book in books
        bookContainer += '<div class="book-container">
                        <a href="item" class="book-thumb">
                        <img src="/img/no-image.png" alt="">'

        bookContainer += '<h1 class="title" href="#">' + book.title + '</h1>'
        bookContainer += '<p class="author">' + book.authors + '</p>'
        bookContainer += '<p class="price">' + book.price + ',-</p>'
        bookContainer += '</a></div>'

    $('.books').html bookContainer
    console.log bookContainer
    return

$('input[name=search]').on "keyup", (event) ->
    that = $(this).val()

    if event.keyCode == 13 then searchAPI that # window.location.href = "/search/" + that.replace(/\ /g, '-')
    if event.keyCode == 8 then searchAPI that
    if that.match(/^\s*$/) then return false # Search is empty or spaces only

    searchAPI that
