angular.module('myApp').controller('RegisterController', function($scope, $http, $rootScope,$location,$cookies) {


  // $('#datetimepicker6').datetimepicker();

  //             $("#datetimepicker6").on("dp.change", function (e) {
  //                 $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
  //             });
  //            var  geocoder = new google.maps.Geocoder();
  //             if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(function (p) {
  //         var latlng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
  //         alert(p.coords.latitude);
  //         alert(p.coords.longitude);

  // // geocoder.geocode({
  //       latlng: latlng
  //     },
  //     function(responses) {
  //     if (responses && responses.length > 0)
  //     {
  //        alert(responses[0].formatted_address);
  //     } else {
  //       alert('Cannot determine address at this location.');
  //     }

  //         var mapOptions = {
  //             center: latlng,
  //             zoom: 13,
  //             mapTypeId: google.maps.MapTypeId.ROADMAP
  //         };
  //         var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
  //         var marker = new google.maps.Marker({
  //             position: latlng,
  //             map: map,
  //             draggable: true ,
  //             title: "<div style = 'height:60px;width:200px'><b>Your location:</b><br />Latitude: " + p.coords.latitude + "<br />Longitude: " + p.coords.longitude
  //         });

  // // init(latlng);
  //         google.maps.event.addListener(marker, "click", function (e) {
  //             var infoWindow = new google.maps.InfoWindow();
  //             infoWindow.setContent(marker.title);
  //             infoWindow.open(map, marker);

  //         });
  //     });
  // // });

  // } else {
  //     alert('Geo Location feature is not supported in this browser.');
  // }


  // function init(latlng)
  // {

  // var geocoder = geocoder = new google.maps.Geocoder();
  //             geocoder.geocode({ 'latlng': latlng }, function (results, status) {
  //                 if (status == google.maps.GeocoderStatus.OK) {
  //                     if (results[1]) {
  //                         alert("Location: " + results[1].formatted_address);
  //                     }
  //                 }
  //             });
  // }

  // sample drag map
  // var map;
  // var marker;
  //         if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(function (p) {
  // var myLatlng = new google.maps.LatLng(p.coords.latitude,p.coords.longitude);
  // var geocoder = new google.maps.Geocoder();
  // var infowindow = new google.maps.InfoWindow();
  // function initialize(){
  // var mapOptions = {
  // zoom: 18,
  // center: myLatlng,
  // mapTypeId: google.maps.MapTypeId.ROADMAP
  // };

  // map = new google.maps.Map(document.getElementById("myMap"), mapOptions);

  // marker = new google.maps.Marker({
  // map: map,
  // position: myLatlng,
  // draggable: true
  // });

  // geocoder.geocode({'latLng': myLatlng }, function(results, status) {
  // if (status == google.maps.GeocoderStatus.OK) {
  // if (results[0]) {
  // $('#latitude,#longitude').show();
  // $('#address').val(results[0].formatted_address);
  // $('#latitude').val(marker.getPosition().lat());
  // $('#longitude').val(marker.getPosition().lng());
  // infowindow.setContent(results[0].formatted_address);
  // infowindow.open(map, marker);
  // }
  // }
  // });

  // google.maps.event.addListener(marker, 'dragend', function() {

  // geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
  // if (status == google.maps.GeocoderStatus.OK) {
  // if (results[0]) {
  // $('#address').val(results[0].formatted_address);
  // $('#latitude').val(marker.getPosition().lat());
  // $('#longitude').val(marker.getPosition().lng());
  // infowindow.setContent(results[0].formatted_address);
  // infowindow.open(map, marker);
  // }
  // }
  // });
  // });

  // }
  // google.maps.event.addDomListener(window, 'load', initialize);
  // }}
  // else {
  //     alert('Geo Location feature is not supported in this browser.');
  // }

  var latitude,longitude;
  var map;
  var marker;

  initialize();

  function initialize(){

  if (navigator.geolocation)
   {
   navigator.geolocation.getCurrentPosition(function (p)
    {
    var latlng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
    var geocoder = new google.maps.Geocoder();
  var infowindow = new google.maps.InfoWindow();

  var mapOptions = {
  zoom: 18,
  center: latlng,
  mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("myMap"), mapOptions);

  marker = new google.maps.Marker({
  map: map,
  position: latlng,
  draggable: true
  });

  geocoder.geocode({'latLng': latlng }, function(results, status) {
  if (status == google.maps.GeocoderStatus.OK) {
  if (results[0]) {
  $('#latitude,#longitude').show();
  $('#address').val(results[0].formatted_address);
  // $('#latitude').val(marker.getPosition().lat());
  // $('#longitude').val(marker.getPosition().lng());
  infowindow.setContent(results[0].formatted_address);
  infowindow.open(map, marker);
  }
  }
  });

  google.maps.event.addListener(marker, 'dragend', function() {

  geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
  if (status == google.maps.GeocoderStatus.OK) {
  if (results[0]) {
  $('#address').val(results[0].formatted_address);
  // $('#latitude').val(marker.getPosition().lat());
  // $('#longitude').val(marker.getPosition().lng());
  infowindow.setContent(results[0].formatted_address);
  infowindow.open(map, marker);
  }
  }
  });
  });

  });
  }
  else
  {
    alert('Geo Location feature is not supported in this browser.');
  }
  }


  $scope.ridelater=function()
  {
  $location.path('/booking');
  }


  $scope.ridenow=false;


  $scope.now=function()
  {
      $scope.ridenow=true;
      var geocoder = geocoder = new google.maps.Geocoder();
              geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                      if (results[1]) {
                          alert("Location: " + results[1].formatted_address);
                      }
                  }
              });
  }



  init();

  function init() {

      var acInputs = document.getElementsByClassName("autocomplete");

      for (var i = 0; i < acInputs.length; i++) {

          var autocomplete = new google.maps.places.Autocomplete(acInputs[i]);

          autocomplete.inputId = acInputs[i].id;
          google.maps.event.addDomListener(window, 'load', initialize);
      }
  }



  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  google.maps.event.addDomListener(window, 'load', function () {
      new google.maps.places.SearchBox(document.getElementById('ac1'));
      // new google.maps.places.SearchBox(document.getElementById('ac2'));
      directionsDisplay = new google.maps.DirectionsRenderer({ 'draggable': true });
  });


  var refresh = function () {
          $http.get('/car/car').success(function (response) {
              console.log(' car type read');
              $scope.carlist = response;
              $scope.car = "";
          });
      };

    refresh();


   });
