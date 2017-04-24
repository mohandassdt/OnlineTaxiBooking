angular.module('myApp').controller('ConfirmController', function($scope,$http,$rootScope,$location,AuthenticationService,$cookies) {
  $scope.cnf=$rootScope.bookedCab;
  var refreshConfirm= function () {
        $http.get('/cnfm/cnfm').success(function (response) {
            console.log('cab Book READ IS SUCCESSFUL');
            $scope.cndetaillist = response;
            $scope.cndetail = "";
        });
    };

    refreshConfirm();
    var loggedInUser;
      var authUser = $cookies.getObject('authUser');
            console.log(authUser);
            if (authUser != undefined) {
                loggedInUser = authUser.currentUser.userInfo;
                console.log(loggedInUser);
              }

              document.getElementById("name").innerHTML=authUser.currentUser.userInfo.fname;
              document.getElementById("mail").innerHTML=authUser.currentUser.userInfo.email;
              document.getElementById("phne").innerHTML=authUser.currentUser.userInfo.mobile;


    $scope.LogoutUser = function() {
        AuthenticationService.Logout(function(response) {
            // if (response.data.success === true) {
                $location.path('/Login');

        });
    };

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
    $scope.cndetail.Cname=authUser.currentUser.userInfo.fname;
    $scope.cndetail.Mail=authUser.currentUser.userInfo.email;
    $scope.cndetail.Mobile=authUser.currentUser.userInfo.mobile;


console.log($scope.cndetail.Mobile);

      $http.post('/cnfm/cnfm', $scope.cndetail).success(function (response) {
          console.log(response);
          console.log("Book CREATE IS SUCCESSFUL");
          alert("Booking Success...Driver will contact you soon");
          refreshConfirm();
      });

$location.path('/');
  };


})
