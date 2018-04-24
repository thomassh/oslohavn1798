//Sjekker om map canvas er fullstendig lastet inn før google maps api plasseres i "head"
/*document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelectorAll('#map').length > 0)
  {
    if (document.querySelector('html').lang)
      lang = document.querySelector('html').lang;
    else
      lang = 'en';

    var js_file = document.createElement('script');
    js_file.type = 'text/javascript';
    js_file.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap&key=AIzaSyAQeOCQuyykCzjnb2M874aEVpHTl3RRR6Y&language=' + lang;
    document.getElementsByTagName('head')[0].appendChild(js_file);
  }
});*/

//The custom overlay object's prototype to a new instance of OverlayView
var overlay
OslohavnOverlay.prototype = new google.maps.OverlayView()

//Initialize Google maps
var map

function initMap () {
  //var center = {lat: 63.432717, lng: 10.404480}; Trondheim
  var center = { lat: 59.909, lng: 10.7508 }
  var options = {
    center: center,
    zoom: 17,
    minZoom: 16,
    maxZoom: 18,
    streetViewControl: false,
    mapTypeControl: false
  }

  map = new google.maps.Map(document.getElementById('map'), options)

  //Overlay
  var bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(59.90504, 10.73888),
    new google.maps.LatLng(59.9137, 10.75971)
  )

  // The photograph is courtesy of the U.S. Geological Survey.
  var srcImage = '../img/oslohavn1798-kart.png'

  // The custom USGSOverlay object contains the USGS image,
  // the bounds of the image, and a reference to the map.
  overlay = new OslohavnOverlay(bounds, srcImage, map)

  /*	var marker = null;

	function autoUpdate() {
	  navigator.geolocation.watchPosition(function(position) {  
	    var newPoint = new google.maps.LatLng(position.coords.latitude, 
	                                          position.coords.longitude);

	    if (marker) {
	      // Marker already created - Move it
	      marker.setPosition(newPoint);
	    }
	    else {
	      // Marker does not exist - Create it
	      marker = new google.maps.Marker({
	        position: newPoint,
	        map: map
	      });
	    }

	    // Center the map on the new position
	    map.setCenter(newPoint);
	  }); 

	  // Call the autoUpdate() function every 3 seconds
	  setTimeout(autoUpdate, 3000);
	}

	autoUpdate();
//end geotracker     */
} //End of initMap

/** @constructor */
function OslohavnOverlay (bounds, image, map) {
  // Initialize all properties.
  this.bounds_ = bounds
  this.image_ = image
  this.map_ = map

  // Define a property to hold the image's div. We'll
  // actually create this div upon receipt of the onAdd()
  // method so we'll leave it null for now.
  this.div_ = null

  // Explicitly call setMap on this overlay.
  this.setMap(map)
}

/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
OslohavnOverlay.prototype.onAdd = function () {
  var div = document.createElement('div')
  div.style.borderStyle = 'none'
  div.style.borderWidth = '0px'
  div.style.position = 'absolute'

  // Create the img element and attach it to the div.
  var img = document.createElement('img')
  img.src = this.image_
  img.style.width = '100%'
  img.style.height = '100%'
  img.style.position = 'absolute'
  div.appendChild(img)

  this.div_ = div

  // Add the element to the "overlayLayer" pane.
  var panes = this.getPanes()
  panes.overlayLayer.appendChild(div)
}

OslohavnOverlay.prototype.draw = function () {
  // We use the south-west and north-east
  // coordinates of the overlay to peg it to the correct position and size.
  // To do this, we need to retrieve the projection from the overlay.
  var overlayProjection = this.getProjection()

  // Retrieve the south-west and north-east coordinates of this overlay
  // in LatLngs and convert them to pixel coordinates.
  // We'll use these coordinates to resize the div.
  var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest())
  var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast())

  // Resize the image's div to fit the indicated dimensions.
  var div = this.div_
  div.style.left = sw.x + 'px'
  div.style.top = ne.y + 'px'
  div.style.width = ne.x - sw.x + 'px'
  div.style.height = sw.y - ne.y + 'px'
}

// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
OslohavnOverlay.prototype.onRemove = function () {
  this.div_.parentNode.removeChild(this.div_)
  this.div_ = null
}

//Call geolocalization
var watchID
function showPosition () {
  if (navigator.geolocation) {
    autoUpdate()
    // watchID = navigator.geolocation.watchPosition(successCallback);
  } else {
    alert('Sorry, your browser does not support HTML5 geolocation.')
  }
}

function successCallback (position) {
  toggleWatchBtn.innerHTML = 'Stop Watching'

  // Check position has been changed or not before doing anything
  if (prevLat != position.coords.latitude || prevLong != position.coords.longitude) {
    // Set previous location
    var prevLat = position.coords.latitude
    var prevLong = position.coords.longitude
    console.log(prevLat, prevLong)
  }
}

function startWatch () {
  var toggleWatchBtn = document.getElementById('toggleWatchBtn')

  toggleWatchBtn.onclick = function () {
    if (watchID) {
      toggleWatchBtn.innerHTML = 'Start Watching'
      navigator.geolocation.clearWatch(watchID)
      watchID = false
    } else {
      toggleWatchBtn.innerHTML = 'Aquiring Geo Location...'
      showPosition()
    }
  }
}

/*var marker=null;
function customMarker(position) {

    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var myLatlng = new google.maps.LatLng(lat, long);
    if(marker==null){
         var iconimage = new google.maps.MarkerImage('../img/current_location_small.png',
             new google.maps.Size(15, 15),
             new google.maps.Point(0,0),
             new google.maps.Point(7, 7)
         );
        marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            icon: iconimage
        });
        marker.setMap(map);
    }else{
        marker.setPosition(myLatlng);
    }
};*/

// Initialise the whole system (above)
window.onload = startWatch

// google.maps.event.addDomListener(window, 'load', initMap);

initMap()

//geotracker
var marker = null
// var newPoint = new google.maps.LatLng(position.coords.latitude,
//                                       position.coords.longitude);

function autoUpdate () {
  watchID = navigator.geolocation.watchPosition(function (position) {
    toggleWatchBtn.innerHTML = 'Stop Watching'
    var newPoint = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)

    if (marker) {
      // Marker already created - Move it
      marker.setPosition(newPoint)
    } else {
      // Marker does not exist - Create it
      marker = new google.maps.Marker({
        position: newPoint,
        map: map,
        icon: '/img/current_location_smaller.png'
      })
    }

    // Center the map on the new position
    map.setCenter(newPoint)
  })

  // Call the autoUpdate() function every 3 seconds
  //   setTimeout(autoUpdate, 3000);
}

// autoUpdate();
//end geotracker

/*var marker=null;
function customMarker(position) {

    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var myLatlng = new google.maps.LatLng(lat, long);
    if(marker==null){
         var iconimage = new google.maps.MarkerImage('../img/current_location_small.png',
             new google.maps.Size(15, 15),
             new google.maps.Point(0,0),
             new google.maps.Point(7, 7)
         );
        marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            icon: iconimage
        });
        marker.setMap(map);
    }else{
        marker.setPosition(myLatlng);
    }
};*/
