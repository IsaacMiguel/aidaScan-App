angular.module('starter.controllers', ['ionic', 'ngCordova'])

.controller('LoginCtrl', function ($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function (data) {
          $state.go('dash');
        }).error(function (data) {
            var alertPopup = $ionicPopup.alert({
              title: 'Error!',
              template: 'Usuario y/o contraseña incorrectos!'
            });
        });
    }
})


.controller('DashCtrl', function ($scope) {})

/*.controller('scanBarcode', function ($scope, $cordovaBarcodeScanner, $http){
  $scope.scanBarcode = function(){
    $cordovaBarcodeScanner
    .scan()
    .then(
      function (imageData){
      $http.get('http://url/' + imageData.text).then(
        function (res) {
          $scope.datos = res.data;
        }
      ).error(function (err) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: 'Vuelva a intentarlo'
        });
      });
    },function (error){
      alert('Vuelva a intentarlo: ' + error);
    });
  }
});*/

//controlador para testear la app con "ionic serve --lab"
.controller('scanBarcode', function ($scope, $http) {
  $scope.scanBarcode = function () {
    $http.get('http://url/' + imageData.text).then(
      function (res) {
        $scope.datos = res.data;
      }
    )
  }
})

.controller('order', function ($scope, buyProduct, $stateParams) {
  $scope.idproduct = $stateParams.idprod;
  $scope.idstore = $stateParams.idstore;

  $scope.data = {};

  $scope.buy = function () {
    buyProduct.buyOrder($scope.idstore, $scope.idproduct, $scope.data.cant);
  }
})

.controller('sticker', function ($scope, printSticker, $stateParams) {
  $scope.idproduct = $stateParams.idprod;
  $scope.idstore = $stateParams.idstore;

  $scope.data = {};

  $scope.print = function () {
    printSticker.pSticker($scope.idstore, $scope.idproduct);
  }
})

.controller('vtoProx', function ($scope, setOutDate, $stateParams) {
  $scope.idproduct = $stateParams.idprod;
  $scope.idstore = $stateParams.idstore;

  $scope.data = {};

  $scope.outDate = function () {
    //console.log('date: ' + $scope.data.outDate)
    setOutDate.sDate($scope.idstore, $scope.idproduct, $scope.data.oDate);
  }
})

.controller('maxNum', function ($scope, setMaxNum, $stateParams) {
  $scope.idproduct = $stateParams.idprod;
  $scope.idstore = $stateParams.idstore;

  $scope.data = {};

  $scope.maxiNum = function () {
    setMaxNum.sMax($scope.idstore, $scope.idproduct, $scope.data.cant);
  }
})

.controller('minNum', function ($scope, setMinNum, $stateParams) {
  $scope.idproduct = $stateParams.idprod;
  $scope.idstore = $stateParams.idstore;

  $scope.data = {};

  $scope.minimNum = function () {
    setMinNum.sMin($scope.idstore, $scope.idproduct, $scope.data.cant);
  }
})