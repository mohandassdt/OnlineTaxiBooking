angular.module('myApp').controller('NavController', function($scope, $http, AuthenticationService, $location,$cookies) {


// $scope.loginText=true;
// $scope.logoutText=false;


initController();

var authUser=$cookies.getObject('authUser');
console.log(authUser);

$scope.logoutText = function(){
    authUser.currentUser.userInfo.usertype== "Admin";
}

// var isLoggedIn=
function initController(){

AuthenticationService.Logout();

}


    $scope.loginButton = function() {
        AuthenticationService.currentUser(function(response) {
            // if (response.data.success === true) {
            $scope.loginText=true;

                $location.path('/Login');

        });
    };


})
