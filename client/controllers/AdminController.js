angular.module('myApp').controller('AdminController', function($scope, $http,$rootScope,$location,AuthenticationService) {

  var refreshConfirm= function () {
        $http.get('/cnfm/cnfm').success(function (response) {
            console.log('cab Book READ IS SUCCESSFUL');
            $scope.cndetaillist = response;
            $scope.cndetail = "";
        });
    };

    refreshConfirm();
    $scope.LogoutUser = function() {
        AuthenticationService.Logout(function(response) {
            // if (response.data.success === true) {
                $location.path('/Login');

        });
    };

var refreshType = function () {
      $http.get('/crtype/crtype').success(function (response) {
          console.log('theater READ IS SUCCESSFUL');
          $scope.typelist = response;
          $scope.type = "";
      });
  };

  refreshType();

  $scope.addType = function () {
    $scope.type.peakhr1=document.getElementById("peak1").value;
    $scope.type.peakhr2=document.getElementById("peak2").value;

      console.log($scope.type);
      $http.post('/crtype/crtype', $scope.type).success(function (response) {
          console.log(response);
          console.log("TYPE CREATE IS SUCCESSFUL");
          refreshType();
      });
  };




  $scope.removeType = function (id) {
      console.log(id);
      $http.delete('/crtype/crtype/' + id._id).success(function (response) {
          console.log(response);
          console.log('theater DELETED SUCCESSFULLY');
          refreshType();
      });
  };

  $scope.editType = function (id) {
       $http.get('/crtype/crtype/' + id._id).success(function (response) {
          $scope.type = response[0];
      });
  };

  $scope.updateType = function () {
      console.log("theater REACHED UPDATE");
      console.log($scope.type._id);
      $http.put('/crtype/crtype/' + $scope.type._id, $scope.type).success(function (response) {
          console.log(response);
          refreshType();
      })
  }


var refreshDriver = function () {
      $http.get('/drive/drive').success(function (response) {
          console.log('READ IS SUCCESSFUL');
          $scope.driverlist = response;
          $scope.drive = "";
      });
  };

  refreshDriver();
 //  function previewFile(){
 //      var preview = document.querySelector('img'); //selects the query named img
 //      var file    = document.querySelector('input[type=file]').files[0]; //sames as here
 //      var reader  = new FileReader();
 //
 //      reader.onloadend = function () {
 //          preview.src = reader.result;
 //      }
 //
 //      if (file) {
 //          reader.readAsDataURL(file); //reads the data as a URL
 //      } else {
 //          preview.src = "";
 //      }
 // }
 //
 // previewFile();  //calls the function named previewFile()


var clickedId;
  // $scope.addDriver = function () {
  //   console.log($scope.drive.pic);
  //   clickedId='DR' + Math.random().toString(10).substr(2,5);
  // $scope.drive.Did=clickedId;
  //     console.log($scope.drive);
  //     $http.post('/drive/drive', $scope.drive).success(function (response) {
  //         console.log(response);
  //         console.log("CREATE IS SUCCESSFUL");
  //         refreshDriver();
  //     });
  // };

  $scope.addDriver = function() {
    clickedId='DR' + Math.random().toString(10).substr(2,5);
  $scope.drive.Did=clickedId;

  $http.post('/drive/drive', $scope.drive).success(function (response) {
      console.log(response);
      console.log("Driver CREATE IS SUCCESSFUL");
      refreshType();
  });
  $scope.drive.UserType="Driver"

      $http.post('/api/signup', $scope.drive).then(function(response) {
          alert('Driver Registration Successful');
            refreshDriver();
      });
  }

  $scope.removeDriver = function (id) {
      console.log(id);
      $http.delete('/drive/drive/' + id._id).success(function (response) {
          console.log(response);
          console.log('DELETED SUCCESSFULLY');
          refreshDriver();
      });
  };

  $scope.editDriver = function (id) {
       $http.get('/drive/drive/' + id._id).success(function (response) {
          $scope.drive = response[0];
      });
  };

  $scope.updateDriver = function () {
      console.log("REACHED UPDATE");
      console.log($scope.drive._id);
      $http.put('/drive/drive/' + $scope.drive._id, $scope.drive).success(function (response) {
          console.log(response);
          refreshDriver();
      })
  }




  $scope.BookedCabs=false;
    $scope.noCabs=false;

  var j;
  var uniqueObj = [];
  // var uniqueDriver = [];
  // var uniqueDriverID = [];
  $scope.vieBook=function(){
    $scope.dateBooked=document.getElementById("dateB").value;
  console.log($scope.dateBooked);
    console.log($scope.asm.crType);
  $http.get('/cnfm/cnfm').success(function (response) {
      console.log('cab Book READ IS SUCCESSFUL');
      $scope.cndetaillist = response;
      $scope.cndetail = "";
for(j=0;j<response.length;j++){
    console.log(response[j].CPickdate);

  if(response[j].CPickdate==$scope.dateBooked&&response[j].CType==$scope.asm.crType){
    console.log(response[j]);
  uniqueObj.push(response[j]);
$scope.details=response[j];
console.log($scope.details);
    $scope.BookedCabs=true;

  }

  else if (response[j].CPickdate!=$scope.dateBooked) {
      $scope.noCabs=false;
  }


  }
  });
  $scope.alBoklist=uniqueObj;

  }


    $scope.confirmAssign = function () {
      $scope.asm.customerId=document.getElementById("cnId").innerHTML;
      $scope.asm.sourcePlace=document.getElementById("srce").innerHTML;
      $scope.asm.DesinationPlace=document.getElementById("dest").innerHTML;
      $scope.asm.pickdate=document.getElementById("dy").innerHTML;
      $scope.asm.pickTime=document.getElementById("tme").innerHTML;
      $scope.asm.Landmark1=document.getElementById("ln1").innerHTML;
      $scope.asm.Landmark2=document.getElementById("ln2").innerHTML;
      $scope.asm.name=document.getElementById("name").innerHTML;
      $scope.asm.amount=document.getElementById("amnt").innerHTML;
      $scope.asm.mail=document.getElementById("email").innerHTML;
      $scope.asm.mobile=document.getElementById("mblno").innerHTML;
console.log($scope.asm.crType);
// console.log($scope.asm.dId);
console.log($scope.asm.customerId);


$rootScope.asDriver=$scope.asm;

$location.path('/assigning');

 }

 $scope.RegisterAdmin = function() {

 $scope.admin.UserType="Admin"

     $http.post('/api/signup', $scope.admin).then(function(response) {
         alert('Admin Registration Successful');

     });
 }


})
