
//The custom overlay object's prototype to a new instance of OverlayView
var overlay
OslohavnOverlay.prototype = new google.maps.OverlayView()

//Initialize Google maps
var map;

function initMap() {

  var center = { lat: 59.9101702, lng: 10.7485500 }
  var options = {
    center: center,
    zoom: 17,
    minZoom: 16,
    maxZoom: 18,
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
  },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
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
    marker360: 'current_location_smaller.svg'
  }

var features = [
    /*{
      lat: 59.9100002,
      lng: 10.7495500,
      type: 'marker3d',
      data: { id: 'ad88057e7ecb40f58b333bb33037802c' }
      //prinsensgt/lille strandgt 3D
    },
   /* {
      lat: 59.9090502,
      lng: 10.7537000,
      type: 'marker360',
      data: { id: '7PNhh', title: 'Bordtomter' }
      //bordtomter 360
    },*/
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
    },
    {
      lat: 59.9095402,
      lng: 10.7478000,
      type: 'marker360',
      data: { id: '7PN5B', title: 'Tollbugata/Fred Olsens gate' }
      //Tollbugata/Fred Olsens gt 360
    },
    {
      lat: 59.9089002,
      lng: 10.7498800,
      type: 'marker360',
      data: { id: '7PNhN', title: 'Utenfor Tollboden' }
      //Ved siden av Tollboden 360
    },
    {
      lat: 59.9092002,
      lng: 10.7489800,
      type: 'marker360',
      data: { id: '7PNSm', title: 'Strandgata/Tollbugata' }
      //Strandgata/Tollbugata 360
    },
    {
      lat: 59.9107702,
      lng: 10.7503500,
      type: 'marker360',
      data: { id: '7PNSp', title: 'Kjeglebane' }
      //Kjeglebane 360
    },
    /*{
      lat: 59.9085002,
      lng: 10.7473000,
      type: 'marker360',
      data: { id: '7PN5S' }
      //Grønningen/sadelmakerhullet/fisketorget 360
    },*/
    /*{
      lat: 59.9091202,
      lng: 10.7475000,
      type: 'marker360',
      data: { id: '7PNhL', title: 'Fred. Olsens gate'  }
      //Grønningen 360
    },
    {
      lat: 59.9088002,
      lng: 10.7481000,
      type: 'marker360',
      data: { id: '7PNSq', title: 'Grønningen' }
      //Grønningen/Børshagen 360
    },
    {
      lat: 59.9089002,
      lng: 10.7478000,
      type: 'marker360',
      data: { id: '7PNSX', title: 'Over Grønningen' }
      //Grønningen/Børshagen oversikt 360
    },
    {
      lat: 59.9082602,
      lng: 10.7473400,
      type: 'marker360',
      data: { id: '7PNSP', title: 'Fisketorget' }
      //Fisketorget 360
    },
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
    },
    {
      lat: 59.910713,
      lng: 10.749119,
      type: 'marker360',
      data: { id: '7PNh0', title: 'Inngangen til Paleet' }
      //foran inngagen til Paleet 360
    },
    {
      lat: 59.9098402,
      lng: 10.7483000,
      type: 'marker360',
      data: { id: '7PNhp', title: 'Treschowgården' }
      //Treschowgården 360
    },*/
    {
      lat: 59.9101002,
      lng: 10.7486000,
      type: 'marker360',
      data: { id: '7PN5t', title: 'Fred. Olsens gate/Prinsens gate' }
      //Fred Olsens gt/prinsens gt 360
    }/*,
    {
      lat: 59.9100002,
      lng: 10.74958000,
      type: 'marker360',
      data: { id: '7PNh7', title: 'Paleet og Paléhagen' }
      //Paleet/paléhaven 360
    },
    {
      lat: 59.9095002,
      lng: 10.75150000,
      type: 'marker360',
      data: { id: '7PNh5', title: 'Havnebassenget utenfor Paléhagen' }
      //Havnebassenget utenfor paviljongen 360
    },*
      lat: 59.9087002,
      lng: 10.75070000,
      type: 'marker360',
      data: { id: '7PNJF', title: 'Havnebassenget utenfor Tollboden' }
      //Havnebassenget utenfor Tollboden 360
    }*/
  ]


  var templates = {
    
  marker360: function (data){return `<div id="iw-container"><div class="iw-content"><iframe width="260" height="379"
  style="width: 260px; height: 379px; border: none;" frameborder="0" allow="vr,gyroscope,accelerometer,fullscreen"
  scrolling="no" allowfullscreen="true" style="max-width: 100%;" 
  src="https://kuula.co/share/${data.id}?fs=1&vr=1&iosfs=1&thumbs=1&hideinst=1&chromeless=1&logo=-1"></iframe><div class="iw-title"><p>${data.title}</p></div></div></div>`
  },

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

   /* marker.addListener('click', function () {
      var template = templates[feature.type];
      var content = template(feature.data);
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
    });*/
  
  });

      // *
  // START INFOWINDOW CUSTOMIZE.
  // The google.maps.event.addListener() event expects
  // the creation of the infowindow HTML structure 'domready'
  // and before the opening of the infowindow, defined styles are applied.
  // *
/*  google.maps.event.addListener(infoWindow, 'domready', function() {

    // Reference to the DIV that wraps the bottom of infowindow
    var iwOuter = $('.gm-style-iw');

    /* Since this div is in a position prior to .gm-div style-iw.
     * We use jQuery and create a iwBackground variable,
     * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
    */
 /*   var iwBackground = iwOuter.prev();

    // Removes background shadow DIV
    iwBackground.children(':nth-child(2)').css({'display' : 'none'});

    // Removes white background DIV
    iwBackground.children(':nth-child(4)').css({'display' : 'none'});

    // Changes the desired tail shadow color.
    iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'none', 'z-index' : '1', 'background': '#4f8bc6'});

    // Reference to the div that groups the close button elements.
    var iwCloseBtn = iwOuter.next();

    // Apply the desired effect to the close button
    iwCloseBtn.css({opacity: '1', right: '8px', top: '5px', width: '23px', height: '23px', 'content': 'url(img/x.svg)', 'border': '5px solid #4f8bc6', 'border-radius': '50%', 'box-shadow': '0 0 5px black', 'background-color': '#4f8bc6'});

    // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
    /*if($('.iw-content').height() < 140){
      $('.iw-bottom-gradient').css({display: 'none'});
    }*/

/*    // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
    iwCloseBtn.mouseout(function(){
      $(this).css({opacity: '1'});
    });
  });*/

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

initMap()