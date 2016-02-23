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

.controller('scanBarcode', function ($scope, $cordovaBarcodeScanner, $http){
  $scope.scanBarcode = function(){
    $cordovaBarcodeScanner
    .scan()
    .then(
      function (imageData){
      $http.get(url + imageData.text).then(
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
})

.controller('order', function ($scope, buyProduct, $stateParams, $window, $ionicPopup) {
  $scope.interno = $stateParams.interno;
  $scope.idstore = $stateParams.idstore;
  $scope.codigo = $stateParams.codigo;

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
  $scope.idstore = $stateParams.idstore;
  $scope.codigo = $stateParams.codigo;

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

.controller('vtoProx', function ($scope, setOutDate, $stateParams, $ionicPopup) {
  $scope.interno = $stateParams.interno;
  $scope.idstore = $stateParams.idstore;
  $scope.codigo = $stateParams.codigo;

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

.controller('minNum', function ($scope, getMinStock, setMinNum, $stateParams, $ionicPopup) {
  var idstore = $stateParams.idstore;
  var interno = $stateParams.interno;

  $scope.data = {};

  getMinStock.minStock(idstore, interno).success(function (data) {

    $scope.idstore = idstore;
    $scope.idproduct = $stateParams.idprod;
    $scope.minWinter = data[0].st_minimo;
    $scope.minSummer = data[0].st_minimoi;

  }).error(function (data) {
    var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: 'No se pudo leer los minimos'
      });
  });

  $scope.minimNum = function () {
    var cWinter = $scope.data.cantMinWinter;
    var cSummer = $scope.data.cantMinSummer;

    if (cWinter == '' || cWinter === undefined) {
      cWinter = $scope.minWinter;
      console.log('cWinter: ' + cWinter);
    }

    if (cSummer == '' || cSummer === undefined) {
      cSummer = $scope.minSummer;
    }

    setMinNum.sMin(idstore, interno, cWinter, cSummer).success(
    function (data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Enviado',
        template: 'Se ha actualizado los valores correctamente'
      });
    }).error(function (data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: 'Se ha producido un error, vuelva a intentarlo'
      });
    });
  }
})

.controller('maxNum', function ($scope, getMaxStock, setMaxNum, $stateParams, $ionicPopup) {
  var idstore = $stateParams.idstore;
  var interno = $stateParams.interno;

  $scope.data = {};

  getMaxStock.maxStock(idstore, interno).success(function (data) {

    $scope.idstore = idstore;
    $scope.idproduct = $stateParams.idprod;
    $scope.maxWinter = data[0].st_maximoI;
    $scope.maxSummer = data[0].st_maximoV;

  }).error(function (data) {
    var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: 'No se pudo leer los maximos'
      });
  });

  $scope.maxiNum = function () {
    var cWinter = $scope.data.cantMaxWinter;
    var cSummer = $scope.data.cantMaxSummer;

    if (cWinter == '' || cWinter === undefined) {
      cWinter = minWinter;
    }

    if (cSummer == '' || cSummer === undefined) {
      cSummer = minSummer;
    }

    setMaxNum.sMax(idstore, interno, cWinter, cSummer).success(
    function (data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Enviado',
        template: 'Se ha actualizado los valores correctamente'
      });
    }).error(function (data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: 'Se ha producido un error, vuelva a intentarlo'
      });
    });
  }
})