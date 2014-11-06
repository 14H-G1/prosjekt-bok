// Disable scroll zooming and bind back the click event
var onMapMouseleaveHandler = function (event) {
    var that = $(this);

    that.on('click', onMapClickHandler);
    that.off('mouseleave', onMapMouseleaveHandler);
    that.find('iframe').css("pointer-events", "none");
}

var onMapClickHandler = function (event) {
    var that = $(this);

    // Disable the click handler until the user leaves the map area
    that.off('click', onMapClickHandler);

    // Enable scrolling zoom
    that.find('iframe').css("pointer-events", "auto");

    // Handle the mouse leave event
    that.on('mouseleave', onMapMouseleaveHandler);
}

// Enable map zooming with mouse scroll when the user clicks the map
$('.maps').on('click', onMapClickHandler);

function validateInput(selector, lengthLimit) {
    /* Checks if the length of selector is over the limit,
     * and responds with adding/removing error class */
    if ($(selector).val().length > lengthLimit)
        $(selector).addClass("input-error");
    else
        $(selector).removeClass("input-error");
}

$(function() {
    /* Check input fields */
    $("input[type=text]").on('keyup', function() {
        console.log($(this).val());

        /* Validating inputs */
        validateInput("input[name=title]", 60);
        validateInput("input[name=publishDate]", 4);
        validateInput("input[name=price]", 4);
    });

    /* Register when contact icons clicked */
    $(".fa").click(function() {
        $(this).toggleClass("toggled");
    });

    /* Send book info to server */
    $("#send-book").click(function() {
        alert('Ikke implementert.');
    });

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#image-preview').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#inputImage").change(function() {
        readURL(this);
        $("#open-upload").hide();
        $("#image-preview").css("display", "inline-block");
        $("#second-image").css("display", "inline-block");
    });

});
