

angular.module('myApp').controller('BookingController', function($scope, $http, $rootScope,$location,$cookies,AuthenticationService) {
$scope.LogoutUser = function() {
    AuthenticationService.Logout(function(response) {
            $location.path('/');

    });
};

// var socket=io();

var refreshType = function () {
      $http.get('/crtype/crtype').success(function (response) {
          console.log('theater READ IS SUCCESSFUL');
          $scope.typelist = response;
        console.log($scope.typelist);
      });
  };
refreshType();

    var latitude,longitude;
    var latlng,geocoder,infowindow;
    var map;
    var marker;
    var slectedCar;
    var tpeCar;
    var money;
    var totalMoney;
    var travelDist;
    var km;
    var i;
    var lat,long;



    initialize();

    function initialize(){

    if (navigator.geolocation)
     {
     navigator.geolocation.getCurrentPosition(function (p)
      {
     latlng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
      geocoder = new google.maps.Geocoder();
   infowindow = new google.maps.InfoWindow();

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
    $('#latitude').val(marker.getPosition().lat());
    lat=document.getElementById("latitude").value;
    alert(lat);
    $('#longitude').val(marker.getPosition().lng());
    long=document.getElementById("longitude").value;
    alert(long);
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
    $('#latitude').val(marker.getPosition().lat());
lat=document.getElementById("latitude").value;
alert(lat);
    $('#longitude').val(marker.getPosition().lng());
    long=document.getElementById("longitude").value;
    alert(long);
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

    //
    // $scope.ridelater=function()
    // {
    // $location.path('/booking');
    // }





    init();

    function init() {

        var acInputs = document.getElementsByClassName("autocomplete");

        for (var i = 0; i < acInputs.length; i++) {

            var autocomplete = new google.maps.places.Autocomplete(acInputs[i]);

            autocomplete.inputId = acInputs[i].id;
            google.maps.event.addDomListener(window, 'load', initialize);
        }
    }



    var directionsService = new google.maps.DirectionsService();
    google.maps.event.addDomListener(window, 'load', function () {
        new google.maps.places.SearchBox(document.getElementById('ac1'));
        directionsDisplay = new google.maps.DirectionsRenderer({ 'draggable': true });
    });


    var source;
    var destination;
    var directionsDisplay;
    var distance,duration;
    var directionsService = new google.maps.DirectionsService();
    google.maps.event.addDomListener(window, 'load', function () {
        new google.maps.places.SearchBox(document.getElementById('address'));
        new google.maps.places.SearchBox(document.getElementById('ac1'));
        directionsDisplay = new google.maps.DirectionsRenderer({ 'draggable': true });
    });


     $scope.GetRoute=function() {
        var mumbai = new google.maps.LatLng(18.9750, 72.8258);
        var mapOptions = {
            zoom: 7,
            center: mumbai
        };
        map = new google.maps.Map(document.getElementById('dvMap'), mapOptions);
        // directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('dvPanel'));
        source = document.getElementById("address").value;
        destination = document.getElementById("ac1").value;

        var request = {
            origin: source,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });

        //*********DISTANCE AND DURATION**********************//
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
            origins: [source],
            destinations: [destination],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
        }, function (response, status) {
            if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
                 distance = response.rows[0].elements[0].distance.text;
                 duration = response.rows[0].elements[0].duration.text;
                var dvDistance = document.getElementById("dvDistance");
              //  dvDistance.innerHTML = "";
                // dvDistance.innerHTML = "Distance: " + distance ;
                // dvTime.innerHTML = "Duration:" + duration;


            } else {
                alert("Unable to find the distance via road.");
            }
        });
    }



$scope.calDetails=false;
$scope.buttonDetails=true;

      var clicked;
    $scope.clickBook = function () {
      var geocoder = geocoder = new google.maps.Geocoder();
              geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                      if (results[1]) {
                          console.log("Location: " + results[1].formatted_address);
                      }
                  }
              });

      $scope.bokc.sourceLoc=document.getElementById("address").value;
      $scope.bokc.DesinationLoc=document.getElementById("ac1").value;
      console.log($scope.bokc.sourceLoc);
      console.log($scope.bokc.DesinationLoc);

      var date = new Date();
      var hour = date.getHours();
      var min = date.getMinutes();
      $scope.bokc.PickTime = hour+":"+min;
document.getElementById("totalDist").innerHTML=distance;
document.getElementById("totalTime").innerHTML=duration;
$scope.calDetails=true;
$scope.buttonDetails=false;


                  for(i=0;i<=$scope.typelist.length;i++){
                        console.log($scope.typelist);
                        // console.log($scope.typelist[i].peakhr1);
                          console.log($scope.bokc.PickTime);
                          travelDist=parseFloat(distance);
                    if($scope.typelist[i].CrTp==$scope.bokc.Type){
                      if($scope.typelist[i].peakhr1>$scope.bokc.PickTime|$scope.typelist[i].peakhr2<$scope.bokc.PickTime){
                      console.log($scope.typelist[i].Amount);
                      money=$scope.typelist[i].Amount;
                  console.log(money);

                  if($scope.typelist[i].Free<travelDist){

                  km=travelDist-$scope.typelist[i].Free;

                  totalMoney=parseFloat($scope.typelist[i].Amount)+parseFloat((km*$scope.typelist[i].after))+parseFloat(($scope.typelist[i].Free*$scope.typelist[i].till));

                  console.log(totalMoney);
                  document.getElementById("totalCabFare").innerHTML=totalMoney;


                  }


                    else{

                    totalMoney=parseFloat($scope.typelist[i].Amount)+parseFloat(travelDist*$scope.typelist[i].till);
                    console.log(totalMoney);
                  document.getElementById("totalCabFare").innerHTML=totalMoney;

                    }

                  }
                  else{
                    alert("Your Booking is in a Peak Time. So your amount will be higher than the normal rates")

                    totalMoney=parseFloat($scope.typelist[i].Amount)+parseFloat(travelDist*$scope.typelist[i].peakrate);
                    console.log(totalMoney);
                  document.getElementById("totalCabFare").innerHTML=totalMoney;

                  }

            }

                }



      $scope.bokc.amount=totalMoney;
        // $scope.bokc.DesinationLoc
        // $scope.bokc.Pickdate=document.getElementById("dateT").value;
        // $scope.bokc.PickTime=document.getElementById("timeT").value;
        clicked='BK' + Math.random().toString(10).substr(2,5);
      $scope.bokc.id=clicked;

        console.log($scope.bokc);
        $http.post('/bkc/bkc', $scope.bokc).success(function (response) {
            console.log(response);
            console.log("Book CREATE IS SUCCESSFUL");
            refreshBook();
        });

    }
    // var goldStar = {
    //          path: 'img/carMarker.png',
    //          fillColor: 'yellow',
    //      fillOpacity: 0.8,
    //      scale: 1,
    //      strokeColor: 'gold',
    //      strokeWeight: 14
    //
    //        };
var latt,longt;
    var socket=io();
    socket.on('driverdetails',function(data){
      document.getElementById("container1").innerHTML=data.latitude;
      document.getElementById("container").innerHTML=data.Longitude;

latt=data.latitude;
longt=data.Longitude;


      marker = new google.maps.Marker({
                          position: new google.maps.LatLng(latt,longt),
                          map: map,
                            icon: 'https://cdn1.iconfinder.com/data/icons/travel-and-holiday-2/130/_Taxi-128.png',
                            latti:data.message[1],
                         title: 'Driver'
                      })

    })

var driverslist=[];
// socket.on('close',function(data)
// {
//   console.log(data);
// })

      var refreshUserGet= function () {
            $http.get('/api/getuser').success(function (response) {
                console.log('cab Book READ IS SUCCESSFUL');
                $scope.Userlist = response;
            });
        };


refreshUserGet();

var loggedInUser;
  var authUser = $cookies.getObject('authUser');
        console.log(authUser);
        if (authUser != undefined) {
            loggedInUser = authUser.currentUser.userInfo;
            console.log(loggedInUser);
          }
var j;
var customerDetails;

var unique=[];
    $scope.confirmlaterBookingNow=function(){

$scope.bokc.CustomerName=authUser.currentUser.userInfo.fname;
$scope.bokc.CustomerNumber=authUser.currentUser.userInfo.mobile;
$scope.bokc.CustomerMail=authUser.currentUser.userInfo.email;
      for(j=0;j<$scope.Userlist.length;j++){
        if($scope.Userlist[j].UserType=='Driver'){

          var lat1=parseFloat(lat).toFixed(4);
          var long2=parseFloat(long).toFixed(4);

          // alert(long);
          if($scope.Userlist[j].latitude==lat1 &&$scope.Userlist[j].longitude==long2){
          if(unique.indexOf($scope.Userlist[j].Email) === -1){
    unique.push($scope.Userlist[j].Email);
    console.log(unique);

       customerDetails=$scope.bokc;
        }
}}}


};



    $scope.laterDetails=false;
    $scope.calDisDetails=false;

    $scope.clickBookLater = function () {
      $scope.buttonDetails=false;
      $scope.laterDetails=true;


    }

    $scope.fareDetailsLater = function () {
      var geocoder = geocoder = new google.maps.Geocoder();
              geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                      if (results[1]) {
                          console.log("Location: " + results[1].formatted_address);
                      }
                  }
              });

      $scope.bokc.sourceLoc=document.getElementById("address").value;
      $scope.bokc.DesinationLoc=document.getElementById("ac1").value;
      console.log($scope.bokc.sourceLoc);
      console.log($scope.bokc.DesinationLoc);
      $scope.bokc.PickTime =document.getElementById("timeV").value;
      $scope.bokc.Pickdate =document.getElementById("dateT").value;

    document.getElementById("totalDist1").innerHTML=distance;
    document.getElementById("totalTime1").innerHTML=duration;
    $scope.laterDetails=true;
    $scope.buttonDetails=false;
                  for(i=0;i<=$scope.typelist.length;i++){
                        console.log($scope.typelist);
                        // console.log($scope.typelist[i].peakhr1);
                          console.log($scope.bokc.PickTime);
                          travelDist=parseFloat(distance);
                    if($scope.typelist[i].CrTp==$scope.bokc.Type){
                      if($scope.typelist[i].peakhr1>$scope.bokc.PickTime|$scope.typelist[i].peakhr2<$scope.bokc.PickTime){
                      console.log($scope.typelist[i].Amount);
                      money=$scope.typelist[i].Amount;
                  console.log(money);

                  if($scope.typelist[i].Free<travelDist){

                  km=travelDist-$scope.typelist[i].Free;

                  totalMoney=parseFloat($scope.typelist[i].Amount)+parseFloat((km*$scope.typelist[i].after))+parseFloat(($scope.typelist[i].Free*$scope.typelist[i].till));

                  console.log(totalMoney);
                  document.getElementById("totalCabFare1").innerHTML=totalMoney;
                  $scope.calDisDetails=true;
                  }


                    else{

                    totalMoney=parseFloat($scope.typelist[i].Amount)+parseFloat(travelDist*$scope.typelist[i].till);
                    console.log(totalMoney);
                  document.getElementById("totalCabFare1").innerHTML=totalMoney;
                  $scope.calDisDetails=true;

                    }

                  }
                  else{
                    alert("Your Booking is in a Peak Time. So your amount will be higher than the normal rates")

                    totalMoney=parseFloat($scope.typelist[i].Amount)+parseFloat(travelDist*$scope.typelist[i].peakrate);
                    console.log(totalMoney);
                  document.getElementById("totalCabFare1").innerHTML=totalMoney;
                  $scope.calDisDetails=true;

                  }

            }

                }
    };

    $scope.confirmlaterBooking=function(){
      clicked='BK' + Math.random().toString(10).substr(2,5);
    $scope.bokc.id=clicked;
    $scope.bokc.amount=totalMoney;


              console.log($scope.bokc);
              $http.post('/bkc/bkc', $scope.bokc).success(function (response) {
                  console.log(response);
                  console.log("Book CREATE IS SUCCESSFUL");

                          $rootScope.bookedCab=$scope.bokc;
                      $location.path('/Confirm');
              });


    }




})
