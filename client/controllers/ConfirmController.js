angular.module('myApp').controller('ConfirmController', function($scope, $http,$rootScope,$location) {
  $scope.cnf=$rootScope.bookedCab;
  var refreshConfirm= function () {
        $http.get('/cnfm/cnfm').success(function (response) {
            console.log('cab Book READ IS SUCCESSFUL');
            $scope.cndetaillist = response;
            $scope.cndetail = "";
        });
    };

    refreshConfirm();

  $scope.ConfirmBook = function () {
    $scope.cndetail.Cid=$scope.cnf.id;
    $scope.cndetail.CsourceLoc=$scope.cnf.sourceLoc;
    $scope.cndetail.CDesinationLoc=$scope.cnf.DesinationLoc;
    $scope.cndetail.CType=$scope.cnf.Type;
    $scope.cndetail.CLandmark1=$scope.cnf.Landmark1;
    $scope.cndetail.CLandmark2=$scope.cnf.Landmark2;
    $scope.cndetail.CPickTime=$scope.cnf.PickTime;
    $scope.cndetail.CPickdate=$scope.cnf.Pickdate;
    $scope.cndetail.CAmount=$scope.cnf.amount;

console.log($scope.cndetail.Mobile);

      $http.post('/cnfm/cnfm', $scope.cndetail).success(function (response) {
          console.log(response);
          console.log("Book CREATE IS SUCCESSFUL");
          refreshConfirm();
      });

$location.path('/home');
  };


})
