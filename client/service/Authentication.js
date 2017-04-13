'use strict';
angular.module('myApp').factory('AuthenticationService', Service);

function Service($http, $cookies, $sessionStorage) {
    var service = {};
    service.Login = Login;
    service.Logout = Logout;
service.LogDriver = LogDriver;
    return service;

    function Login(user, callback) {
        $http.post('/api/login', user)
            .then(function(response) {
                if (response.data.success && response.data.token) {
                    $sessionStorage.tokenDetails = {
                        token: response.data.token
                    };
                    $http.defaults.headers.common.Authorization = response.data.token;
                    var obj = {
                        currentUser: {
                            isLoggedIn: true,
                            userInfo: {
                                id: response.data.userDetail._id,
                                email: response.data.userDetail.Email,
                                fname: response.data.userDetail.FirstName,
                                lname: response.data.userDetail.LastName,
                                mobile: response.data.userDetail.MobileNumber,
                                usertype: response.data.userDetail.UserType
                                    //userType: response.userDetail.userType
                            }
                        }
                    };
                    $cookies.putObject('authUser', obj);
                    callback(response);
                } else {
                    callback(response);
                }
            });
    }
    function LogDriver(driver, callback) {
        $http.post('/drive/loginDriver', driver)
            .then(function(response) {
                if (response.data.success && response.data.token) {
                    $sessionStorage.tokenDetails = {
                        token: response.data.token
                    };
                    $http.defaults.headers.common.Authorization = response.data.token;
                    var obj = {
                        currentDriver: {
                            isLoggedIn: true,
                          Info: {
                                id: response.data.userDetail._id,
                                Did: response.data.userDetail.Did,
                                name: response.data.userDetail.name,
                                age: response.data.userDetail.age,
                                Car: response.data.userDetail.Car,
                                carNo: response.data.userDetail.carNo,
                                licence: response.data.userDetail.licence,
                                drtype: response.data.userDetail.drtype
                                // usertype: response.data.userDetail.UserType
                            }
                        }
                    };
                    $cookies.putObject('auth', obj);
                    callback(response);
                } else {
                    callback(response);
                }
            });
    }

    function Logout() {
        delete $sessionStorage.tokenDetails;
        $http.defaults.headers.common.Authorization = '';
        $cookies.remove('authUser');

    }
}
