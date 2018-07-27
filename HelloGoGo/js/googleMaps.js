/* Google Maps Component */

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

// Global Vars
var map, infoWindow, geoMarker;
var comGeoDataArray = [];
var comGeoTriggerArray = [];
var markerCircle;
var currentCouponArray;

// called for map init
function initMap() {
  map = new google.maps.Map(document.getElementById('mapBox'), {
    center: {lat: 54.618858, lng: -6.562680},
    zoom: 8,
    gestureHandling: 'greedy',
		scrollwheel: true,
  	zoomControl: true
  });


  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // set geoMarker
      var marker = new google.maps.Marker({
        position: pos,
        icon: "./assets/character.png",
        map: map
      });

      // set position
      map.setCenter(pos);

      // add radius circle
      markerCircle = new google.maps.Circle({
        map: map,
        radius: 1609.3*15, // 15 miles in metres
        fillColor: '#AA0000'
      });

      // bind circle
      markerCircle.bindTo('center', marker, 'position');

      // get bounds of marker
      var bounds = markerCircle.getBounds();

      // check geo data
      for (var i = 0; i < comGeoDataArray.length; i++) {
        // check it against data marker position
        var dataPos = {
          lat: comGeoDataArray[i].dataLat,
          lng: comGeoDataArray[i].dataLng
        };
        // check bounds
        if (bounds.contains(dataPos)) {
          // toast a message
          var mess = "You are close to: " + comGeoDataArray[i].dataMarker.title;
          M.toast({html: mess});
        }
      }

      // check for triggers
      setTimeout(function () {
        checkForTriggers(bounds);
      }, 3000);

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

// handle error function
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

// get data and add to map
function addDataToMap(data) {
  // cycle through data
  for (var i = 0; i < data.length; i++) {
    // add marker
    var dataMarker = new google.maps.Marker({
      position: {lat: data[i].location[0], lng: data[i].location[1]},
      title: data[i].name,
      label: i.toString(),
      icon: "./assets/markerPlace.png",
      map: map
    });

    // add click event
    dataMarker.addListener('click', function() {
      // get modal id and add content
      var modalContent = document.getElementById("modal-content");
      // get place in array
      var x = parseInt(this.label);
      // get all coupon offers
      var couponStr = '';
      currentCouponArray = [];
      for (var i = 0; i < comGeoDataArray[x].dataInfo.coupons.length; i++) {
        couponStr += '<a id="couBtn'+i+'" class="waves-effect waves-light purple darken-1 btn-large" onclick="modalBarcode(this.id);"><i class="material-icons left">card_membership</i>'+
                     comGeoDataArray[x].dataInfo.coupons[i].offer+'</a>';
        currentCouponArray.push([comGeoDataArray[x].dataInfo.coupons[i].coupon.code, comGeoDataArray[x].dataInfo.coupons[i].coupon.format]);
      }
      // add content
      modalContent.innerHTML = '<h4>'+this.title+'</h4>' +
                               '<p>'+comGeoDataArray[x].dataInfo.info+'</p>' +
                               couponStr+'<br/><br/><div id="couponBox" style="margin: 0 auto;"><img id="barcode" /></div>';

      // open modal display
      $('.modal').modal('open');
    });
    // add the geo data needed later
    var dataInfo = data[i];
    var dataLat = data[i].location[0];
    var dataLng = data[i].location[1];
    comGeoDataArray.push({dataMarker, dataInfo, dataLat, dataLng});
  }
}

// update data and add to map
function updateDataToMap(toUpdate) {

  switch (toUpdate) {
    case "radius":
      // get bounds of marker
      var bounds = markerCircle.getBounds();
      // check geo data
      for (var i = 0; i < comGeoDataArray.length; i++) {
        // check it against data marker position
        var dataPos = {
          lat: comGeoDataArray[i].dataLat,
          lng: comGeoDataArray[i].dataLng
        };
        // check bounds
        if (bounds.contains(dataPos) && comGeoDataArray[i].dataMarker.getVisible()) {
          // toast a message
          var mess = "You are close to: " + comGeoDataArray[i].dataMarker.title;
          M.toast({html: mess});
        }
      }
      break;
    case "tags":
      // get class name props
      var divChips = document.getElementsByClassName('chips');
      // check geo data
      for (var i = 0; i < comGeoDataArray.length; i++) {
        var markerTag = comGeoDataArray[i];
        var markerBool = false;
        // check by tags
        for (var n = 0; n < divChips.tagsChips.children.length-1; n++) {
          if (markerTag.dataInfo.tag === divChips.tagsChips.children[n].firstChild.data) {
            markerBool = true;
            markerTag.dataMarker.setVisible(true);
            break;
          }
        }
        if (!markerBool) {
          markerTag.dataMarker.setVisible(false);
        }
      }
      break;
    default:
      break;
  }

}

// populate map with triggers
function populateTriggers(data) {

  // cycle through and add
  for (var i = 0; i < data.length; i++) {
    // add marker
    var dataMarker = new google.maps.Marker({
      position: {lat: data[i].location[0], lng: data[i].location[1]},
      title: data[i].name,
      icon: "./assets/markerTrigger.png",
      map: map
    });
    // store trigger marker
    var dataInfo = data[i];
    var dataLat = data[i].location[0];
    var dataLng = data[i].location[1];
    comGeoTriggerArray.push({dataMarker, dataInfo, dataLat, dataLng});
  }

}

// check for triggers when called
function checkForTriggers(bounds) {

  // local variables
  var boolTrigger = false;
  var displayArray = [];
  // cycle through and check position against triggers
  for (var i = 0; i < comGeoTriggerArray.length; i++) {
    // check it against data marker position
    var dataPos = {
      lat: comGeoTriggerArray[i].dataLat,
      lng: comGeoTriggerArray[i].dataLng
    };
    // check against user
    if (bounds.contains(dataPos)) {
      // check yes
      boolTrigger = true;
      // add data to display array
      displayArray.push(comGeoTriggerArray[i].dataInfo);
    }
  }

  // open modal
  if (boolTrigger) {
    // open modal display
    var modalContent = document.getElementById("modal-content");

    // cycle through and get panels to add
    var panels;
    for (var i = 0; i < displayArray.length; i++) {
      panels += '<div class="carousel-item blue white-text" href="" style="background-image: url('+DB_MEDIA+comGeoTriggerArray[i].dataInfo.image+');"> \
                  <br/> \
                  <div><span class="grey darken-1" style="font-size:25px;">'+comGeoTriggerArray[i].dataInfo.company+'</span></div> \
                  <br/> \
                  <div><span class="grey darken-1" style="font-size:15px;">'+comGeoTriggerArray[i].dataInfo.offer+'</span></div> \
                  <br/> \
                  <div class="center"> \
                    <a href="'+comGeoTriggerArray[i].dataInfo.link+'" class="waves-effect waves-light purple darken-1 btn-large">Visit here!</a> \
                  </div> \
                </div>';
    }

    modalContent.innerHTML = '<h4 class="fontTitle">Offers today!</h4> \
                              <div class="carousel carousel-slider center"> \
                                '+panels+' \
                              </div>';

    // open modal display
    $('.modal').modal('open');
    // carousel ready to view
    $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      indicators: true
    });
  }

}

// get barcode data for modal
function modalBarcode(btnId) {
  var num = btnId.slice(-1);
  var code = currentCouponArray[num][0];
  var format = currentCouponArray[num][1];
  JsBarcode("#barcode", code, {
    format: format,
    lineColor: "black",
    displayValue: true
  });
}

// check sidebar changes
// when ready
$(document).ready(function() {

  // when slider is changed
  $("#radiusSlider").change(function() {
    markerCircle.setRadius(1609.3*this.value);
    updateDataToMap("radius");
  });

  // when tags/chips are changed
  $("#tagList").click(function() {
    setTimeout(updateDataToMap("tags"), 2000);
  });

  // when keyword is changed
  $("#keyword").change(function() {
    // search and check titles
    for (var i = 0; i < comGeoDataArray.length; i++) {
      if (this.value === comGeoDataArray[i].dataInfo.name) {
        // center and zoom in on position
        var dataPos = {
          lat: comGeoDataArray[i].dataLat,
          lng: comGeoDataArray[i].dataLng
        };
        map.setCenter(dataPos);
        map.setZoom(10);
      }
    }
  });

});
