
angular.module('myApp').controller('DriverAssignController', function($scope,$http,$rootScope,$location,AuthenticationService) {
$scope.assignAj =$rootScope.asDriver;


var refreshDriver = function () {
      $http.get('/drive/drive').success(function (response) {
          console.log('READ IS SUCCESSFUL');
          $scope.driverlist = response;
          $scope.drive = "";
      });
  };

  refreshDriver();
  $scope.LogoutUser = function() {
      AuthenticationService.Logout(function(response) {
          // if (response.data.success === true) {
              $location.path('/Login');

      });
  };

  var i;
  var driverId = [];

$scope.selectDriver=function(){

  for(i=0;i<$scope.driverlist.length;i++){
      console.log($scope.driverlist[i].Did);

    if($scope.driverlist[i].drtype==$scope.assignAj.crType){
      console.log($scope.driverlist[i].Did);
    driverId.push($scope.driverlist[i].Did);

    }

    }
  $scope.driveid=driverId;
}

var refreshConfirm= function () {
      $http.get('/cnfm/cnfm').success(function (response) {
          console.log('cab Book READ IS SUCCESSFUL');
          $scope.cndetaillist = response;
          $scope.cndetail = "";
      });
  };

  refreshConfirm();

      var refreshasn1 = function () {
            $http.get('/asgn/asgn').success(function (response) {
                console.log('READ IS SUCCESSFUL');
                $scope.assignList = response;
                $scope.assignD ="";
            });
        };
        refreshasn1();


          $scope.addAssign = function () {

            $scope.assignD.sourcePlace=$scope.assignAj.sourcePlace;
            $scope.assignD.DesinationPlace=$scope.assignAj.DesinationPlace;
            $scope.assignD.customerId=$scope.assignAj.customerId;
            $scope.assignD.crType=$scope.assignAj.crType;
            $scope.assignD.Landmark1=$scope.assignAj.Landmark1;
                $scope.assignD.Landmark2=$scope.assignAj.Landmark2;
                    $scope.assignD.pickdate=$scope.assignAj.pickdate
                    $scope.assignD.pickTime=$scope.assignAj.pickTime;
                    $scope.assignD.name=$scope.assignAj.name;
                        $scope.assignD.mail=$scope.assignAj.mail;
                            $scope.assignD.amount=$scope.assignAj.amount;
                            $scope.assignD.mobile=$scope.assignAj.mobile;
              console.log($scope.assignD);
              $http.post('/asgn/asgn', $scope.assignD).success(function (response) {
                  console.log(response);
                  console.log("CREATE IS SUCCESSFUL");
                  refreshasn1();
              });
          };

})
