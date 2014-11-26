# Disable scroll zooming and bind back the click event
onMapMouseleaveHandler = (event) ->
  that = $(this)
  that.on "click", onMapClickHandler
  that.off "mouseleave", onMapMouseleaveHandler
  that.find("iframe").css "pointer-events", "none"
  return

onMapClickHandler = (event) ->
  that = $(this)

  # Disable the click handler until the user leaves the map area
  that.off "click", onMapClickHandler

  # Enable scrolling zoom
  that.find("iframe").css "pointer-events", "auto"

  # Handle the mouse leave event
  that.on "mouseleave", onMapMouseleaveHandler
  return

# Enable map zooming with mouse scroll when the user clicks the map
$(".maps").on "click", onMapClickHandler
