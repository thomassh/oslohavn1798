//The custom overlay object's prototype to a new instance of OverlayView
var overlay;
OslohavnOverlay.prototype = new google.maps.OverlayView();

//Initialize Google Maps
function initMap() {
		var oslo = {lat: 59.909000, lng: 10.750800};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
			minZoom: 17,
			maxZoom: 17,
      center: oslo,
			streetViewControl: false,
			mapTypeControl: false,
			zoomControl: false
    });
		

		//geotracker
		var marker = null;

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
	//end geotracker
		
		var allowedBounds = new google.maps.LatLngBounds(
		     new google.maps.LatLng(59.906350, 10.743933),
				 new google.maps.LatLng(59.911800, 10.758620)
		);

    var boundLimits = {
         maxLat : allowedBounds.getNorthEast().lat(),
         maxLng : allowedBounds.getNorthEast().lng(),
         minLat : allowedBounds.getSouthWest().lat(),
         minLng : allowedBounds.getSouthWest().lng()
     };

		var lastValidCenter = map.getCenter();
		var newLat, newLng;
		google.maps.event.addListener(map, 'center_changed', function() {
				center = map.getCenter();
				if (allowedBounds.contains(center)) {
		        // still within valid bounds, so save the last valid position
		        lastValidCenter = map.getCenter();
		        return;
		    }
				newLat = lastValidCenter.lat();
				newLng = lastValidCenter.lng();
				if(center.lng() > boundLimits.minLng && center.lng() < boundLimits.maxLng){
					newLng = center.lng();
				}
				if(center.lat() > boundLimits.minLat && center.lat() < boundLimits.maxLat){
					newLat = center.lat();
				}

		    // not valid anymore => return to last valid position
		    map.panTo(new google.maps.LatLng(newLat, newLng));
		});
				
	  //Place a marker
	  /*var marker = new google.maps.Marker({
	  	position: oslo,
	  	map: map
		});*/

		// The bounds of the overlay
		var bounds = new google.maps.LatLngBounds(
			new google.maps.LatLng(59.906350, 10.743933),
			new google.maps.LatLng(59.911800, 10.758620));

		// The source of the overlay image
		var srcImage = 'img/oslohavn1798-kart.jpg';

		//The custom OslohavnOverlay object contains the image, the bounds of the image, and a reference to the map.
		overlay = new OslohavnOverlay(bounds, srcImage, map);


      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
		//var infoWindow;
		//infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(map);
};

/** @constructor */
function OslohavnOverlay(bounds, image, map)	{

	  //Initialize all properties
	  this.bounds_ = bounds;
	  this.image_ = image;
	  this.map_ = map;

	  //Define a property to hold the image's div
	  this.div_ = null;

	  //Explicitly call setMap on this overlay
	  this.setMap(map);
}

//onAdd is called when the map's panes are ready and the overlay is added to the map
OslohavnOverlay.prototype.onAdd = function() {

	  var div = document.createElement('div');
	  div.style.borderStyle = 'none';
	  div.style.borderWidth = '0px';
	  div.style.position = 'absolute';

	  //Create the img element and attach it to the div
	  var img = document.createElement('img');
	  img.src = this.image_;
	  img.style.width = '100%';
	  img.style.height = '100%';
	  img.style.position = 'absolute';
	  div.appendChild(img);

	  this.div_ = div;

	  //Add the element to the "overlayLayer" pane
	  var panes = this.getPanes();
	  panes.overlayLayer.appendChild(div);
};

//Draw the overlay's div. The image will be resize to the div's coordinates
OslohavnOverlay.prototype.draw = function() {

	  //We use the SW and NE coordinates over the overlay to peg it down
	  var overlayProjection = this.getProjection();

	  //Converting the coordinates to pixels
	  var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
	  var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

	  //Resize the image's div to fit the indicated dimensions
	  var div = this.div_;
	  div.style.left = sw.x + 'px';
	  div.style.top = ne.y + 'px';
	  div.style.width = (ne.x - sw.x) + 'px';
	  div.style.height = (sw.y - ne.y) + 'px';
};

// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
OslohavnOverlay.prototype.onRemove = function() {
		this.div_.parentNode.removeChild(this.div_);
		this.div_ = null;
};
 
google.maps.event.addDomListener(window, 'load', initMap);