angular.module('myApp').controller('HomeController', function($scope, $http, AuthenticationService, $location) {

  var refreshType = function () {
          $http.get('/crtype/crtype').success(function (response) {
              console.log('theater READ IS SUCCESSFUL');
              $scope.typelist = response;
              $scope.type = "";
          });
      };

      refreshType();

      $scope.LoginUser = function() {
          AuthenticationService.Login($scope.User, function(response) {
              if (response.data.success === true) {
                if(response.data.userDetail.UserType=="Customer"){

                    $location.path('/book');
                }
                if(response.data.userDetail.UserType=="Driver"){

                    $location.path('/driver');
                }
                if(response.data.userDetail.UserType=="Admin"){

                    $location.path('/admin');
                }

              }
          });
      };

      $scope.RegisterUser = function() {
        $scope.User.UserType="Customer"
          $http.post('/api/signup', $scope.User).then(function(response) {
              alert('User Registration Successful');
          });
      }
  //     $scope.RegisterUser = function() {
  //     $http.post('/api/signup', $scope.User).then(function(response) {
  //         alert('User Registration Successful');
  //     });
  // }

      var i;
      var money;
      $scope.showmeFare = false;
      $scope.toggle = function() {
          $scope.showmeFare = true;
      };

      $scope.toggleCancel = function() {
      $scope.showmeFare = false;
      };







  var slectedCar;
  var tpeCar;
  var money;
  var totalMoney;
  var travelDist;
  var km;


      $scope.costGet=function () {
    console.log(distance);
    travelDist=parseFloat(distance);
        slectedCar=document.getElementById("selectedType").value;

        tpeCar=slectedCar.trim()
          console.log(tpeCar);
  for(i=0;i<=$scope.typelist.length;i++){
        console.log($scope.typelist);
    if($scope.typelist[i].CrTp==tpeCar){
      console.log($scope.typelist[i].Amount);
      money=$scope.typelist[i].Amount;
  console.log(money);

  if($scope.typelist[i].Free<travelDist){

  km=travelDist-$scope.typelist[i].Free;

  totalMoney=parseFloat($scope.typelist[i].Amount)+parseFloat((km*$scope.typelist[i].after))+parseFloat(($scope.typelist[i].Free*$scope.typelist[i].till));

  console.log(totalMoney);
  document.getElementById("totalFare").innerHTML=totalMoney;

  }


    else{

    totalMoney=parseFloat($scope.typelist[i].Amount)+parseFloat(travelDist*$scope.typelist[i].till);
    console.log(totalMoney);
  document.getElementById("totalFare").innerHTML=totalMoney;
    }

  }}


      }


})
