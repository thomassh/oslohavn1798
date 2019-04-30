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

var isMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};


//The custom overlay object's prototype to a new instance of OverlayView
var overlay
OslohavnOverlay.prototype = new google.maps.OverlayView()

//Initialize Google maps
var map;

function initMap() {

  var center = { lat: 59.909, lng: 10.7508 }
  var options = {
    center: center,
    zoom: 17,
    minZoom: 16,
    maxZoom: 18,
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
  },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
  },
    mapTypeControl: false,
    fullscreenControl: true,
    gestureHandling: "greedy"
  }

  map = new google.maps.Map(document.getElementById('map'), options)

  //Overlay
  var bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(59.90504, 10.73888),
    new google.maps.LatLng(59.9137, 10.75971)
  )

  // The overlay
  var srcImage = '../img/oslohavn1798-kart.png'

  // The custom overlay object contains the overlay,
  // the bounds of the image, and a reference to the map.
  overlay = new OslohavnOverlay(bounds, srcImage, map)

  var icons = {
    marker3d: '3d-punkt.svg',
    marker360: '360-punkt.svg',
    markerFilm: 'film-punkt.svg',
    markerSpill: 'spill-punkt.svg',
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
      data: { id: '7kGPY', title: 'Bordtomter' }
      //bordtomter 360
    },
    /*{
      lat: 59.9079002,
      lng: 10.7533900,
      type: 'marker360',
      data: { id: '7PNJv', title: 'Havnebassenget ved Brinchs kran' }
      //Utenfor Brinchs kran 360
    },*/
    /*{
      lat: 59.9073902,
      lng: 10.7531000,
      type: 'marker360',
      data: { id: '7PNSG', title: 'Brinchs kran' }
      //Nære på Brinchs kran 360
    },*/
    {
      lat: 59.9095402,
      lng: 10.7478000,
      type: 'marker360',
      data: { id: '7kGP9', title: 'Tollbugata/Fred Olsens gate' }
      //Tollbugata/Fred Olsens gt 360
    },
    {
      lat: 59.9089502,
      lng: 10.7498800,
      type: 'marker360',
      data: { id: '7kGPq', title: 'Utenfor Tollboden' }
      //Ved siden av Tollboden 360
    },
    {
      lat: 59.9092002,
      lng: 10.7489800,
      type: 'marker360',
      data: { id: '7kGPK', title: 'Strandgata/Tollbugata' }
      //Strandgata/Tollbugata 360
    },
    {
      lat: 59.9107702,
      lng: 10.7503500,
      type: 'marker360',
      data: { id: '7kGP1', title: 'Kjøpmann Meyer' }
      //Kjøpmann Meyer 360
    },
    /*{
      lat: 59.9085002,
      lng: 10.7473000,
      type: 'marker360',
      data: { id: '7PN5S' }
      //Grønningen/sadelmakerhullet/fisketorget 360
    },*/
    {
      lat: 59.9091202,
      lng: 10.7475000,
      type: 'marker360',
      data: { id: '7kGPw', title: 'Fred. Olsens gate'  }
      //Grønningen 360
    },
    {
      lat: 59.9088002,
      lng: 10.7481000,
      type: 'marker360',
      data: { id: '7kGYc', title: 'Grønningen' }
      //Grønningen/Børshagen 360
    },/*
    {
      lat: 59.9089002,
      lng: 10.7478000,
      type: 'marker360',
      data: { id: '7PNSX', title: 'Over Grønningen' }
      //Grønningen/Børshagen oversikt 360
    },*/
    {
      lat: 59.9082602,
      lng: 10.7473400,
      type: 'marker360',
      data: { id: '7kGPk', title: 'Fisketorget' }
      //Fisketorget 360
    },/*
    {
      lat: 59.9075602,
      lng: 10.7484000,
      type: 'marker360',
      data: { id: '7PNSf', title: 'Enden av Langkaia' }
      //Enden av Langkaia 360
    },
    {
      lat: 59.9081902,
      lng: 10.7466000,
      type: 'marker360',
      data: { id: '7PNSl', title: 'Sadelmakerhullet' }
      //Sadelmakerhullet 360
    },*/
    {
      lat: 59.910713,
      lng: 10.749119,
      type: 'marker360',
      data: { id: '7kGPb', title: 'Inngangen til Paleet' }
      //foran inngangen til Paleet 360
    },/*
    {
      lat: 59.9098402,
      lng: 10.7483000,
      type: 'marker360',
      data: { id: '7PNhp', title: 'Treschowgården' }
      //Treschowgården 360
    },*/
    {
      lat: 59.9101702,
      lng: 10.7485500,
      type: 'marker360',
      data: { id: '7kGPZ', title: 'Fred. Olsens gate/Prinsens gate' }
      //Fred Olsens gt/prinsens gt 360
    },
    {
      lat: 59.9100002,
      lng: 10.74958000,
      type: 'marker360',
      data: { id: '7kGPD', title: 'Paleet og Paléhagen' }
      //Paleet/paléhaven 360
    },
    {
      lat: 59.9092002,
      lng: 10.75153000,
      type: 'marker360',
      data: { id: '7kGPs', title: 'Havnebassenget utenfor Paléhagen' }
      //Havnebassenget utenfor paviljongen 360
    },
    {
      lat: 59.9088002,
      lng: 10.75070000,
      type: 'marker360',
      data: { id: '7kGPc', title: 'Havnebassenget utenfor Tollboden' }
      //Havnebassenget utenfor Tollboden 360
    },/*
    {
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
      data: { id: 'bac9cbe7113c447b8705c6e894744ff3', title: 'Brinchs kran' }
      //kran 3D
    },
    {
      lat: 59.9089502,
      lng: 10.7494990,
      type: 'marker3d',
      data: { id: '24360d044f9e41b2a26eb26fbc4135ab', title: 'Sjøboder' }
      //sjøbod 3D
    },
    {
      lat: 59.9091902,
      lng: 10.7501000,
      type: 'marker3d',
      data: { id: '8ecf11be057f43a99319544a54e5465a', title: 'Tollboden' }
      //tollbod 3D
    },
    {
      lat: 59.9094202,
      lng: 10.7480300,
      type: 'marker3d',
      data: { id: 'fbbedd3820494d16b87130d4fa49470e', title: 'Corps de garde' }
      //tollvaktboden 3D
    },
    {
      lat: 59.9126402,
      lng: 10.7469000,
      type: 'marker3d',
      data: { id: 'ad88057e7ecb40f58b333bb33037802c', title: 'Oslo domkirke' }
      //domkirken 3D
    },
    {
      lat: 59.9108202,
      lng: 10.7506900,
      type: 'markerSpill',
      data: { id: 'Kjeglebanen/index.html', title: 'Kjeglebane-spill' }
      //kjeglebane-spill
    },/*
    {
      lat: 59.9099002,
      lng: 10.7506000,
      type: 'marker360',
      data: { url: 'christiania-havn_equirectangular.jpg' }
      //paléhaven
    },*/
    {
      lat: 59.908849,
      lng: 10.751809,
      type: 'markerFilm',
      data: { id: 'x53I9o4jgks', title: 'Oslo havn 1798'}
    }
  ]

  if( isMobile.any() ) {
    features[23] = {
      lat: 59.9108202,
      lng: 10.7506900,
      type: 'markerSpill',
      data: { id: 'https://c.simmer.io/static/unityFrame/index.html?url=https%3A%2F%2Fsimmercdn.com%2Funity%2FRZffdeDw9pggAqlC58PnEn9tHAF3%2Fcontent%2Ffb2142db-d4ad-abab-9c79-a6f7a251da64&imagePath=screens/0.png', title: 'Kjeglebane-spill (krever WebGL)' }
      //kjeglebane-spill
    }
  };

  var templates = {
    marker3d: function(data) {
      return `<div id="iw-container"><div class="iw-content"><div class="sketchfab-embed-wrapper"><iframe width="260" height="379" 
      src="https://sketchfab.com/models/${data.id}/embed?annotation_cycle=8" frameborder="0" 
      allowvr allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" 
      onmousewheel=""></iframe></div><div class="iw-title"><p>${data.title}</p></div></div>`
    },

    /*marker360: function (data){return `<div style="width: 640px; height: 480px;"><a-scene embedded>
    
    <a-sky src='img/${data.url}' radius='2500'></a-sky>	
  
    <a-camera position='0 0.5 2'>
    </a-camera>
  
  </a-scene></div>`},*/
  marker360: function (data){return `<div id="iw-container"><div class="iw-content"><iframe width="260" height="379"
  style="width: 260px; height: 379px; border: none;" frameborder="0" allow="vr,gyroscope,accelerometer,fullscreen"
  scrolling="no" allowfullscreen="true" style="max-width: 100%;" 
  src="https://kuula.co/share/${data.id}?fs=1&vr=1&iosfs=1&thumbs=1&hideinst=1&chromeless=1&logo=-1"></iframe><div class="iw-title"><p>${data.title}</p></div></div></div>`
  },

  
  markerFilm: function(data) {
      return `<div id="iw-container"><div class="iw-content"><iframe width="560" height="315" src="https://www.youtube.com/embed/${data.id}?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><div class="iw-title"><p>${data.title}</p></div></div></div>`
    },
  
  markerSpill: function(data) {
    return `<div id="iw-container"><div class="iw-content"><iframe width="560" height="350"
    src="${data.id}" style="border:0"></iframe><div class="iw-title"><p>${data.title}</p></div></div></div>`
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

         // Set up a close delay for CSS animations
         var infoWindow = null;
         var closeDelayed = false;
         var closeDelayHandler = function() {
             $(infoWindow.getWrapper()).removeClass('active');
             setTimeout(function() {
                 closeDelayed = true;
                 infoWindow.close();
             }, 300);
         };
     
         // Add a Snazzy Info Window to the marker
        var infoWindow = new SnazzyInfoWindow({
         marker: marker,
         wrapperClass: 'custom-window',
         closeWhenOthersOpen: 'true',
         offset: {
             top: '-60px'
         },
         edgeOffset: {
             top: 50,
             right: 60,
             bottom: 50
         },
         border: false,
         closeButtonMarkup: '<button type="button" class="custom-close"></button>',
         callbacks: {
             open: function() {
                 $(this.getWrapper()).addClass('open');
             },
             afterOpen: function() {
                 var wrapper = $(this.getWrapper());
                 wrapper.addClass('active');
                 wrapper.find('.custom-close').on('click', closeDelayHandler);
             },
             beforeClose: function() {
                 if (!closeDelayed) {
                     closeDelayHandler();
                     return false;
                 }
                 return true;
             },
             afterClose: function() {
                 var wrapper = $(this.getWrapper());
                 wrapper.find('.custom-close').off();
                 wrapper.removeClass('open');
                 closeDelayed = false;
             }
         }
     });
     

    marker.addListener('click', function () {
      var template = templates[feature.type];
      var content = template(feature.data);
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
    });
  
  });



    // Event that closes the Info Window with a click on the map
    /*google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
    });*/

      // *
  // START INFOWINDOW CUSTOMIZE.
  // The google.maps.event.addListener() event expects
  // the creation of the infowindow HTML structure 'domready'
  // and before the opening of the infowindow, defined styles are applied.
  // *
  google.maps.event.addListener(infoWindow, 'domready', function() {

    // Reference to the DIV that wraps the bottom of infowindow
    var iwOuter = $('.gm-style-iw');

    /* Since this div is in a position prior to .gm-div style-iw.
     * We use jQuery and create a iwBackground variable,
     * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
    */
    var iwBackground = iwOuter.prev();

    // Removes background shadow DIV
    iwBackground.children(':nth-child(2)').css({'display' : 'none'});

    // Removes white background DIV
    iwBackground.children(':nth-child(4)').css({'display' : 'none'});

    // Changes the desired tail shadow color.
    iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'none', 'z-index' : '1', 'background': '#4f8bc6'});

    // Reference to the div that groups the close button elements.
    var iwCloseBtn = iwOuter.next();

    // Apply the desired effect to the close button
    iwCloseBtn.css({opacity: '1', right: '8px', top: '5px', width: '23px', height: '23px', 'background-image': 'url(img/x.svg)', 'border': '5px solid #4f8bc6', 'border-radius': '50%', 'box-shadow': '0 0 5px black', 'background-color': '#4f8bc6', 'overflow': 'hidden'});

    // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
    if($('.iw-content').height() < 140){
      $('.iw-bottom-gradient').css({display: 'none'});
    }

   // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
    iwCloseBtn.mouseout(function(){
      $(this).css({opacity: '1'});
    });
  });

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

// Set the visibility to 'hidden' or 'visible'.
OslohavnOverlay.prototype.hide = function() {
  if (this.div_) {
    // The visibility property must be a string enclosed in quotes.
    this.div_.style.visibility = 'hidden';
  }
};

OslohavnOverlay.prototype.show = function() {
  if (this.div_) {
    this.div_.style.visibility = 'visible';
  }
};

OslohavnOverlay.prototype.toggle = function() {
  if (this.div_) {
    if (this.div_.style.visibility === 'hidden') {
      this.show();
    } else {
      this.hide();
    }
  }
};

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
  toggleWatchBtn.innerHTML = 'Slutt å spore meg'

  // Check position has been changed or not before doing anything
  if (prevLat != position.coords.latitude || prevLong != position.coords.longitude) {
    // Set previous location
    var prevLat = position.coords.latitude
    var prevLong = position.coords.longitude
    console.log(prevLat, prevLong)
  }
}

/*function startWatch() {
  var toggleWatchBtn = document.getElementById('toggleWatchBtn')

  toggleWatchBtn.onclick = function () {
    if (watchID) {
      toggleWatchBtn.innerHTML = 'Hvor er jeg?'
      navigator.geolocation.clearWatch(watchID)
      watchID = false
    } else {
      toggleWatchBtn.innerHTML = 'Søker...'
      showPosition()
    }
  }
}*/

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
/*window.onload = startWatch*/

// google.maps.event.addDomListener(window, 'load', initMap);

initMap()

//geotracker
var marker = null
// var newPoint = new google.maps.LatLng(position.coords.latitude,
//                                       position.coords.longitude);

function autoUpdate() {
  watchID = navigator.geolocation.watchPosition(function (position) {
    toggleWatchBtn.innerHTML = 'Slutt å spore meg'
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
