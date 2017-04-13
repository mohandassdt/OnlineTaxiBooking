angular.module('myApp').controller('LoginController', function($scope, $http, AuthenticationService, $location) {
    $scope.LoginUser = function() {
        AuthenticationService.Login($scope.User, function(response) {
            if (response.data.success === true) {
              if(response.data.userDetail.UserType=="User"){

                  $location.path('/admin');
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

    $scope.LogoutUser = function() {
        AuthenticationService.Logout(function(response) {
            // if (response.data.success === true) {
                $location.path('/Login');

        });
    };

    $scope.RegisterUser = function() {
      $scope.User.UserType="User"
        $http.post('/api/signup', $scope.User).then(function(response) {
            alert('User Registration Successful');
        });
    }

})
