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
var map;

function initMap() {

  //var center = {lat: 63.432717, lng: 10.404480}; Trondheim
  var center = { lat: 59.909, lng: 10.7508 }
  var options = {
    center: center,
    zoom: 17,
    minZoom: 16,
    maxZoom: 18,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    gestureHandling: "greedy"
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

  var icons = {
    marker3d: '3d-punkt.svg',
    marker360: '360-punkt.svg',
    markerFilm: 'film-punkt.svg'
  }

  var features = [
    /*{
      lat: 59.9097022,
      lng: 10.7513600,
      type: 'marker3d',
      data: { id: 'ad88057e7ecb40f58b333bb33037802c' }
      //lysthuset 3D
    },
    {
      lat: 59.9100002,
      lng: 10.7495500,
      type: 'marker3d',
      data: { id: 'ad88057e7ecb40f58b333bb33037802c' }
      //prinsensgt/lille strandgt 3D
    },
    {
      lat: 59.9095402,
      lng: 10.7478000,
      type: 'marker3d',
      data: { id: 'ad88057e7ecb40f58b333bb33037802c' }
      //fred olsensgt/tollbugt 3D
    },*/
    {
      lat: 59.9090502,
      lng: 10.7537000,
      type: 'marker360',
      data: { id: '7lrPJ' }
      //bordtomter 360
    },
    {
      lat: 59.9095402,
      lng: 10.7478000,
      type: 'marker360',
      data: { id: '7lrqD' }
      //Tollbugata/Fred Olsens gt 360
    },
    {
      lat: 59.9089502,
      lng: 10.7501100,
      type: 'marker360',
      data: { id: '7lrqJ' }
      //Ved siden av Tollboden 360
    },
    {
      lat: 59.9084002,
      lng: 10.7473000,
      type: 'marker360',
      data: { id: '7lrqb' }
      //sadelmakerhullet 360
    },
    /*{
      lat: 59.9099002,
      lng: 10.7506000,
      type: 'marker360',
      data: { id: '7lrPJ' }
      //paléhaven
    },*/
    {
      lat: 59.9074802,
      lng: 10.7535600,
      type: 'marker3d',
      data: { id: 'bac9cbe7113c447b8705c6e894744ff3' }
      //kran 3D
    },
    {
      lat: 59.9089502,
      lng: 10.7494990,
      type: 'marker3d',
      data: { id: '24360d044f9e41b2a26eb26fbc4135ab' }
      //sjøbod 3D
    },
    {
      lat: 59.9091902,
      lng: 10.7501000,
      type: 'marker3d',
      data: { id: 'df4dd6b623354951a565c0bc3b5b9900' }
      //tollbod 3D
    },
    {
      lat: 59.9089002,
      lng: 10.7486000,
      type: 'marker3d',
      data: { id: 'fbbedd3820494d16b87130d4fa49470e' }
      //tollvaktboden 3D
    },
    {
      lat: 59.9126402,
      lng: 10.7469000,
      type: 'marker3d',
      data: { id: 'f7050bf71cfc4a7783fc51534db23ca4' }
      //domkirken 3D
    }

    
   /* {
      lat: 59.9099002,
      lng: 10.7506000,
      type: 'marker360',
      data: { url: 'christiania-havn_equirectangular.jpg' }
      //paléhaven
    },
    {
      lat: 59.9082,
      lng: 10.74,
      type: 'markerFilm',
      data: { id: '2TKXdVJ0waY'}
    }*/
  ]

  var templates = {
    marker3d: function(data) {
      return `<div class="sketchfab-embed-wrapper"><iframe width="260" height="379" 
      src="https://sketchfab.com/models/${data.id}/embed?annotation_cycle=8" frameborder="0" 
      allowvr allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" 
      onmousewheel=""></iframe> <p style="font-size: 13px; font-weight: normal; margin: 5px; color: #4A4A4A;"> 
      <a href="https://sketchfab.com/models/${data.id}?utm_medium=embed&utm_source=website&utm_campain=share-popup" 
      target="_blank" style="font-weight: bold; color: #1CAAD9;"></p></div>`
    },

    /*marker360: function (data){return `<div style="width: 640px; height: 480px;"><a-scene embedded>
    
    <a-sky src='img/${data.url}' radius='2500'></a-sky>	
  
    <a-camera position='0 0.5 2'>
    </a-camera>
  
  </a-scene></div>`},*/
  marker360: function (data){return `<iframe width="260" height="379" 
  style="width: 260px; height: 379px; border: none;" frameborder="0" allow="vr,gyroscope,accelerometer,fullscreen"
  scrolling="no" allowfullscreen="true" style="max-width: 100%;" 
  src="https://kuula.co/share/${data.id}?fs=1&vr=1&iosfs=1&thumbs=1&hideinst=1&chromeless=1&logo=-1"></iframe>`},

  
  markerFilm: function(data) {
      return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${data.id}?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
    }
  }

  var infoWindow = new google.maps.InfoWindow();

  features.forEach(function (feature) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(feature.lat, feature.lng),
      icon: {
        url: '/img/' + icons[feature.type],
        scaledSize: new google.maps.Size(23, 32)
      },
      map
    })

    marker.addListener('click', function () {
      var template = templates[feature.type];
      var content = template(feature.data);
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
    });

  })





} //End of initMap



/** @constructor */
function OslohavnOverlay(bounds, image, map) {
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
function showPosition() {
  if (navigator.geolocation) {
    autoUpdate()
    // watchID = navigator.geolocation.watchPosition(successCallback);
  } else {
    alert('Sorry, your browser does not support HTML5 geolocation.')
  }
}

function successCallback(position) {
  toggleWatchBtn.innerHTML = 'Stop Watching'

  // Check position has been changed or not before doing anything
  if (prevLat != position.coords.latitude || prevLong != position.coords.longitude) {
    // Set previous location
    var prevLat = position.coords.latitude
    var prevLong = position.coords.longitude
    console.log(prevLat, prevLong)
  }
}

function startWatch() {
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

function autoUpdate() {
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
        icon: {
          url: '/img/current_location_smaller.svg',
          scaledSize: new google.maps.Size(18, 28)
        }
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
