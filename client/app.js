var app = angular.module('myApp', ['ngRoute', 'ngCookies', 'ngStorage']);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/Home.html',
        controller: 'HomeController'
    }).when('/Login', {
        templateUrl: 'views/Login.html',
        controller: 'LoginController'
      }).when('/DriverLogin', {
          templateUrl: 'views/DriverLogin.html',
          controller: 'DriverLoginController'
    }).when('/Register', {
        templateUrl: 'views/Register.html',
        // controller: 'RegisterController'
      }).when('/book', {
          templateUrl: 'views/book.html',
          controller: 'BookingController'
        }).when('/driver', {
            templateUrl: 'views/driver.html',
            controller: 'DriverController'
      }).when('/Cancellation', {
          templateUrl: 'views/Cancellation.html',
          controller: 'CancellationController'
        }).when('/Confirm', {
            templateUrl: 'views/Confirm.html',
            controller: 'ConfirmController'
          }).when('/assigning', {
              templateUrl: 'views/assigning.html',
              controller: 'DriverAssignController'

          }).when('/Profile', {
              templateUrl: 'views/Profile.html'

    }).when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminController'
    });
});

app.run(function($rootScope, $http, $location, $sessionStorage, $cookies) {
    if ($sessionStorage.tokenDetails) {
        $http.defaults.headers.common.Authorization = $sessionStorage.tokenDetails.token;
    }

    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        var publicPages = ['/', '/Login', '/Register','/Cancellation'];
      var AdminPages = ['/','/admin','/assigning','/Login'];
      var customerPages = ['/','/book','/cancellation','/Confirm','/Login'];
      var DriverPages = ['/','/driver','/Login'];

        var authUser = $cookies.getObject('authUser');
        if (authUser != undefined) {
            var loggedInUser = authUser.currentUser.userInfo;
        }

        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$sessionStorage.tokenDetails && $location.path() != '') {
            $location.path('/Login');
        }else{
          if (authUser != undefined) {
                       if(authUser.currentUser.userInfo.usertype==='Driver'){
                         var Driver = DriverPages.indexOf($location.path()) === -1;
                         if(Driver){
                           $location.path('/Unauthorized');
                         }

                       }
                       if(authUser.currentUser.userInfo.usertype==='User'){
                         var User = AdminPages.indexOf($location.path()) === -1;
                         if(User){
                           $location.path('/Unauthorized');
                         }

                       }
                       if(authUser.currentUser.userInfo.usertype==='Customer'){
                         var Customer = customerPages.indexOf($location.path()) === -1;
                         if(Customer){
                           $location.path('/Unauthorized');
                         }

                       }
            }
        }





    });
});
