angular.module('myApp').controller('DriverController', function($scope, $http,$rootScope,$location) {


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

      $scope.logDriver=false;

      var i,j,k;
      var Driver = [];
      var DriverDetail = [];
        var customerDetail = [];
          var typeDetail = [];
      $scope.viewDetails=function(){

      console.log($scope.driverDetail);

      for(j=0;j<=$scope.driverlist.length;j++){
        console.log($scope.driverlist[j].Did);
      if($scope.driverlist[j].Did==$scope.driverDetail){
      DriverDetail.push($scope.driverlist[j]);
        $scope.logDriver=true;

        for(k=0;k<$scope.assignList.length;k++){
          console.log($scope.assignList[k].dId);
        if($scope.assignList[k].dId==$scope.driverDetail){
        customerDetail.push($scope.assignList[k]);

        for(i=0;i<$scope.typelist.length;i++){
          console.log($scope.typelist[i].CrTp);
        if($scope.typelist[i].CrTp==$scope.assignList[k].crType){
        typeDetail.push($scope.typelist[i]);

        }}
        }}
      }}
      }
$scope.DriverDe=DriverDetail;
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
