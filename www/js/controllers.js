angular.module('starter.controllers', ['ionic', 'ngCordova'])

.controller('LoginCtrl', function ($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function (data) {
          $state.go('dash');
           window.localStorage.setItem("username", data);
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
      $http.get('url' + imageData.text).then(
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
    //$http.get('url' + imageData.text).then(
    $http.get('url').then(
      function (res) {
        $scope.datos = res.data;
      }
    )
  }
})

.controller('order', function ($scope, buyProduct, $stateParams, $window, $ionicPopup) {
  $scope.interno = $stateParams.interno;
  $scope.idstore = $stateParams.idstore;

  $scope.data = {};

  var usr = window.localStorage.getItem("username");

  $scope.buy = function () {
    buyProduct.buyOrder($scope.interno, usr, $scope.data.cant, $scope.idstore).success(function (data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Enviado!',
        template: data
      });
    }).error(function (data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error!',
          template: data
        });
    });
  }
})

.controller('sticker', function ($scope, printSticker, $stateParams, $window, $ionicPopup) {
  $scope.interno = $stateParams.interno;

  $scope.data = {};

  var usr = window.localStorage.getItem("username");

  $scope.print = function () {
    printSticker.pSticker(usr, $scope.interno).success(function (data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Enviado',
        template: data
      });
    }).error(function (data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: data
      });
    });
  }
})

.controller('vtoProx', function ($scope, setOutDate, $stateParams, $window, $ionicPopup) {
  $scope.interno = $stateParams.interno;

  $scope.data = {};

  var usr = window.localStorage.getItem("username");

  $scope.outDate = function () {
    var date = $scope.data.oDate;
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (day < 10) {
      var day = '0' + day;
    }

    if (month < 10) {
      var month = '0' + month;
    }

    var fullDate = year + '-' + month + '-' + day;

    setOutDate.sDate(usr, $scope.interno, fullDate).success(function (data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Enviado',
        template: data
      });
    }).error(function (data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: data
      });
    });
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