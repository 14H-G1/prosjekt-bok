var onMapClickHandler, onMapMouseleaveHandler, validateInput;

onMapMouseleaveHandler = function(event) {
  var that;
  that = $(this);
  that.on("click", onMapClickHandler);
  that.off("mouseleave", onMapMouseleaveHandler);
  that.find("iframe").css("pointer-events", "none");
};

onMapClickHandler = function(event) {
  var that;
  that = $(this);
  that.off("click", onMapClickHandler);
  that.find("iframe").css("pointer-events", "auto");
  that.on("mouseleave", onMapMouseleaveHandler);
};

$(".maps").on("click", onMapClickHandler);

validateInput = function(selector, lengthLimit) {
  if ($(selector).val().length > lengthLimit) {
    $(selector).addClass("input-error");
  } else {
    $(selector).removeClass("input-error");
  }
};

$("input[type=text]").on("keyup", function() {
  console.log($(this).val());
  validateInput("input[name=title]", 60);
  validateInput("input[name=publishDate]", 4);
  validateInput("input[name=price]", 4);
});

$(".fa").click(function() {
  $(this).toggleClass("toggled");
});

$("#send-book").click(function() {
  return alert("Ikke implementert.");
});
