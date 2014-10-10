$(function() {
    /* Check input fields */
    $("input[type=text]").on('keyup', function() {
        console.log($(this).val());

        /* Validating inputs */
        validateInput("input[name=title]", 45);
        validateInput("input[name=publishDate]", 45);
        validateInput("input[name=price]", 45);
        validateInput("input[name=condition]", 45);
    });

    /* Register when contact icons clicked */
    $(".fa").click(function() {
      $(this).toggleClass("toggled");
    });

    /* Send book info to server */
    $("#send-book").click(function() {
        alert('Not yet implemented');
    });

    function validateInput(selector, lengthLimit) {
        /* Checks if the length of selector is over the limit,
         * and responds with adding/removing error class */
        if ($(selector).val().length > lengthLimit)
            $(selector).addClass("input-error");
        else
            $(selector).removeClass("input-error");
    }

    /* A not working post json function */
    function postJSON(JSONData) {
        $.ajax({
            type: 'POST',
            url: '/sell-book',
            contentType:"application/json; charset=utf-8",
            dataType: "json",
            data: JSONData,
            success: function(data) {
                alert("Json POST to server");
            }
        });
    }
});
