angular.module('myApp').controller('DriverController', function($scope, $http,$rootScope,$location,$cookies,AuthenticationService) {


var socket=io();





// socket.on('newCustomerMessage',function(data){
//   document.getElementById("customerContainer").innerHTML=data.message
// })

// $scope.sendmessage=function(){
//   socket.emit('myMessage',{
//     message:document.getElementById("message").value
//   }
//
//   )
// }

$scope.LogoutUser = function() {
    AuthenticationService.Logout(function(response) {
        // if (response.data.success === true) {
            $location.path('/Login');

    });
};

var loggedInUser;
  var authUser = $cookies.getObject('authUser');
        console.log(authUser);
        if (authUser != undefined) {
            loggedInUser = authUser.currentUser.userInfo;
            console.log(loggedInUser);
          }
  // console.log(authUser.currentUser.userInfo.email);
  // console.log(authUser.currentUser.userInfo.fname);
  //
  // var refreshDriver = function () {
  //       $http.get('/drive/drive').success(function (response) {
  //           console.log('READ IS SUCCESSFUL');
  //           $scope.driverlist = response;
  //           $scope.drive = "";
  //       });
  //   };
  //
  //   refreshDriver();

document.getElementById("drivername").innerHTML=authUser.currentUser.userInfo.fname;
  var refreshConfirm= function () {
        $http.get('/cnfm/cnfm').success(function (response) {
            console.log('cab Book READ IS SUCCESSFUL');
            $scope.cndetaillist = response;
            $scope.cndetail = "";
        });
    };

    refreshConfirm();


        var refreshDriver = function () {
              $http.get('/drive/drive').success(function (response) {
                  console.log('READ IS SUCCESSFUL');
                  $scope.driverlist = response;
                  $scope.drive = "";
              });
          };

          refreshDriver();

//
// var userrefresh=function(){
//   $http.get('/api/getuser').success(function (response) {
//       console.log('READ IS SUCCESSFUL');
//       $scope.list = response;
//       $scope.l = "";
//   });
// };
// userrefresh();
// var m;
// var driverId=[];
//
// initDriver();
//
// function initDriver() {
//   for(m=0;m<=$scope.driverlist.length;m++){
//     if($scope.driverlist[m].Email==authUser.currentUser.userInfo.email){
//             // driverId.push
//             driverId.push($scope.driverlist[m].Did);
//     }
//   }
// }
// $scope.driverDetail=driverId;

                  var refreshasn1 = function () {
                        $http.get('/asgn/asgn').success(function (response) {
                            console.log('READ IS SUCCESSFUL');
                            $scope.assignList = response;
                            $scope.assignD ="";
                        });
                    };
                    refreshasn1();
                    var refreshType = function () {
                          $http.get('/crtype/crtype').success(function (response) {
                              console.log('theater READ IS SUCCESSFUL');
                              $scope.typelist = response;
                              $scope.type = "";
                          });
                      };

                      refreshType();

                      // socket.on("ID",function(data){
                      //   // console.log(data.sid);
                      // document.getElementById("getSocket").innerHTML=data.sid
                      //
                      // })

                      getLocation();
                      function getLocation() {
                            // alert(sockid);
                          if (navigator.geolocation) {
                              navigator.geolocation.getCurrentPosition(showPosition);
                          } else {
                              x.innerHTML = "Geolocation is not supported by this browser.";
                          }
                      }
var k,name,carno,carname,email,contactno,sockid;

                      function showPosition(position) {
    // alert(sockid);
                          geoposition.innerHTML = position.coords.latitude;
                        geoposition123.innerHTML  =position.coords.longitude;

                        latitude = document.getElementById("geoposition").innerHTML;
                        longitude = document.getElementById("geoposition123").innerHTML;
                        sockid = document.getElementById("getSocket").innerHTML;
                        console.log(latitude,longitude,sockid);
                        $http.get('/drive/drive').success(function (response) {
    // alert(sockid);
                            $scope.driverlist = response;
                            $scope.d = "";

                            for(k=0;k<$scope.driverlist.length;k++)
                      {
                      if($scope.driverlist[k].Email==loggedInUser.email)
                      {
                      name=$scope.driverlist[k].FirstName;
                      cabType=$scope.driverlist[k].drtype;
                      contactno=$scope.driverlist[k].Mobile;
                      carno=$scope.driverlist[k].carNo;
                      carname=$scope.driverlist[k].Car;
                      email=$scope.driverlist[k].Email;
    // alert(sockid);
                      socket.emit('driverdetails',{
                      lat:latitude,
                      long:longitude,
                      Dname:name,
                      cab:cabType,
                      No:contactno,
                      cno:carno,
                      cname:carname,
                      mail:email
                      // socketid:sockid
                      // console.log(cab,lat,Dname,socketid);
                      });
                      }
                      }    });


}

// var data=function()
// {
//
//
// }

//                         var positionDetails=[latitude,longitude];
//
// var i;
//
// socket.emit('myMessage',{
//   message:positionDetails
//
// })
//
//
//
// $http.get('/api/getuser').success(function (response) {
//     console.log('READ IS SUCCESSFUL');
//     $scope.list = response;
//     $scope.details={};
//     console.log($scope.list);
//
//     // $scope.l.latitude=latitude;
//     // // alert($scope.l.latitude);
//     // $scope.l.longitude=longitude;
//     // alert($scope.l.longitude);
//       console.log("latt and long success");
//     for(i=0;i<=$scope.list.length;i++){
//           // console.log($scope.list[i]._id);
//           var iduser=$scope.list[i]._id;
//           // alert(iduser);
//       if(loggedInUser.id==iduser){
//          $scope.details._id=$scope.list[i]._id;
//         // $scope.details.id=iduser;
//         $scope.details.FirstName=$scope.list[i].FirstName;
//         $scope.details.Password=$scope.list[i].Password;
//         $scope.details.Email=$scope.list[i].Email;
//         $scope.details.UserType=$scope.list[i].UserType;
//         $scope.details.Did=$scope.list[i].Did;
//
//         var lat=parseFloat(latitude).toFixed(4);
//         var long=parseFloat(longitude).toFixed(4);
//         $scope.details.latitude=lat;
//         $scope.details.longitude=long;
// console.log($scope.details);
//         $http.put('/api/update/' + $scope.details._id, $scope.details).success(function (response) {
//             console.log(response);
//
//         })
//
//
//       }
//
//
//     }
//                             });
                      // }



      $scope.driverAccount=false;

      var i,j,k;
      var Driver = [];
      var DriverDetail = [];


      $scope.viewDetails=function(){
      for(j=0;j<=$scope.driverlist.length;j++){
        // console.log($scope.driverlist[j].Did);
      if($scope.driverlist[j].Email==authUser.currentUser.userInfo.email){
        // if($scope.driverlist[j].Email==authUser.currentUser.userInfo.email){
          DriverDetail.push($scope.driverlist[j]);
            $scope.driverAccount=true;

      }}
      }
$scope.DriverDe=DriverDetail;

var customerDetail = [];
  var typeDetail = [];
$scope.customerbooks=false;

$scope.viewCustomers=function(){
  for(j=0;j<=$scope.driverlist.length;j++){
  if($scope.driverlist[j].Email==authUser.currentUser.userInfo.email){
$scope.driverDetail=$scope.driverlist[j].Did;

  for(k=0;k<$scope.assignList.length;k++){
    console.log($scope.assignList[k].dId);
  if($scope.assignList[k].dId==$scope.driverDetail){
  customerDetail.push($scope.assignList[k]);
  $scope.customerbooks=true;

  for(i=0;i<$scope.typelist.length;i++){
    console.log($scope.typelist[i].CrTp);
  if($scope.typelist[i].CrTp==$scope.assignList[k].crType){
  typeDetail.push($scope.typelist[i]);

  }}
}}}}
}
$scope.CustomerDe=customerDetail;
$scope.typeDe=typeDetail;


var refreshBill = function () {
      $http.get('/bil/bil').success(function (response) {
          console.log('BILL READ IS SUCCESSFUL');
          $scope.billist = response;
          $scope.billb = {};
      });
  };

  refreshBill();
// $scope.billb={};
  $scope.addBill = function () {
    var customerid1=document.getElementById("cdi").innerHTML;
    $scope.billb.customerId=customerid1;
    console.log($scope.billb.customerId);
    $scope.billb.sourcePlace=document.getElementById("srce").innerHTML;

    $scope.billb.DesinationPlace=document.getElementById("dest").innerHTML;
    $scope.billb.dId=document.getElementById("didn").innerHTML;
    $scope.billb.pickdate=document.getElementById("dy").innerHTML;
    $scope.billb.pickTime=document.getElementById("tme").innerHTML;
    $scope.billb.name=document.getElementById("name").innerHTML;
    $scope.billb.amount=document.getElementById("amnt").innerHTML;
    $scope.billb.mobile=document.getElementById("mblno").innerHTML;



      console.log($scope.billb);

      $http.post('/bil/bil', $scope.billb).success(function (response) {
          console.log(response);
          console.log("BILL CREATE IS SUCCESSFUL");
          refreshBill();
      });
  };


})
