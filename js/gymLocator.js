$(document).ready(function() {
  // $(".btn-default").on("click", function(e){
  //   e.preventDefault();
  //   var userLocation = $("#userLocation").val();
  //   var googleApiUrl = "https://maps.googleapis.com/maps/api/geocode/json?";
  //   googleApiUrl += "key=AIzaSyB_9FtkYT4VyHxNc8W3e9WA2-zW7yVHgYA";
  //   googleApiUrl += "&address=" + userLocation;

  //   $.ajax({
  //     type: "GET",
  //     url: googleApiUrl,
  //     success: googleApiSuccessHandler
  //   });

  // });

  // function googleApiSuccessHandler(response) {

  //   var geoLocation = response.results[0].geometry.location;
  //   console.log(userLocation);
  // }

  var map;
  var infowindow;

  function initMap() {
    var pyrmont = {
      lat: -33.867,
      lng: 151.195
    };

    map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

    infowindow = new google.maps.InfoWindow();

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: pyrmont,
      radius: 500,
      types: ['store']
    }, callback);
  }

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }



});