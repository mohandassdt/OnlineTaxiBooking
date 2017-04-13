

angular.module('myApp').controller('BookingController', function($scope, $http,$rootScope,$location) {

  var refreshType = function () {
        $http.get('/crtype/crtype').success(function (response) {
            console.log('theater READ IS SUCCESSFUL');
            $scope.typelist = response;
            $scope.type = "";
        });
    };

    refreshType();

    var refreshBook = function () {
          $http.get('/bkc/bkc').success(function (response) {
              console.log('cab Book READ IS SUCCESSFUL');
              $scope.bokclist = response;
              $scope.bokc = "";
          });
      };

      refreshBook();

      var slectedCar;
      var tpeCar;
      var money;
      var totalMoney;
      var travelDist;
      var km;
      var i;


          $scope.fareDetails=function () {
            $scope.bokc.PickTime=document.getElementById("timeT").value;
        console.log(distance);
        travelDist=parseFloat(distance);
            slectedCar=document.getElementById("selectedType").value;

            tpeCar=slectedCar.trim()
              console.log(tpeCar);
      for(i=0;i<=$scope.typelist.length;i++){
            console.log($scope.typelist);
            console.log($scope.typelist[i].peakhr1);
              console.log($scope.bokc.PickTime);

        if($scope.typelist[i].CrTp==tpeCar){
          if($scope.typelist[i].peakhr1>$scope.bokc.PickTime|$scope.typelist[i].peakhr2<$scope.bokc.PickTime){
            alert("Your Booking is in a Peak Time. So your amount will higher than the normal rates")
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
        totalMoney=parseFloat($scope.typelist[i].Amount)+parseFloat(travelDist*$scope.typelist[i].peakrate);
        console.log(totalMoney);
      document.getElementById("totalCabFare").innerHTML=totalMoney;
      }

}

    }


          }




      var clicked;
    $scope.clickBook = function () {
      $scope.bokc.sourceLoc=source;
      $scope.bokc.amount=totalMoney;
        $scope.bokc.DesinationLoc=destination;
        $scope.bokc.Pickdate=document.getElementById("dateT").value;
        $scope.bokc.PickTime=document.getElementById("timeT").value;
        clicked='BK' + Math.random().toString(10).substr(2,5);
      $scope.bokc.id=clicked;

        console.log($scope.bokc);
        $http.post('/bkc/bkc', $scope.bokc).success(function (response) {
            console.log(response);
            console.log("Book CREATE IS SUCCESSFUL");
            refreshBook();
        });

        $rootScope.bookedCab=$scope.bokc;
$location.path('/Confirm');
    };


})
