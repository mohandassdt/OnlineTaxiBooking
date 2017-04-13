angular.module('myApp').controller('HomeController', function($scope, $http) {

  var refreshType = function () {
          $http.get('/crtype/crtype').success(function (response) {
              console.log('theater READ IS SUCCESSFUL');
              $scope.typelist = response;
              $scope.type = "";
          });
      };

      refreshType();

      $scope.RegisterUser = function() {
      $http.post('/api/signup', $scope.User).then(function(response) {
          alert('User Registration Successful');
      });
  }

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
