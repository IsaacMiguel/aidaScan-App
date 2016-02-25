angular.module('starter.controllers', ['ionic', 'ngCordova'])

.controller('LoginCtrl', function ($scope, LoginService, $ionicPopup, $state, $window) {
    $scope.data = {};

    var setTime = new Date();
    window.localStorage.setItem("time", setTime);

    var usr = window.localStorage.getItem("username");

    if (usr === 'null') {
      $scope.login = function() {
        console.log('entro')
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function (data) {
          $state.go('dash');
          window.localStorage.setItem("username", data);

          var setTime = new Date();
          window.localStorage.setItem("time", setTime);

        }).error(function (data) {
            var alertPopup = $ionicPopup.alert({
              title: 'Error!',
              template: 'Usuario y/o contraseña incorrectos!'
            });
        });
      }
    }else{
      $state.go('dash');
    }

    $scope.logOut = function () {
      console.log('logout')
      window.localStorage.setItem("username", 'null');
      $state.go('login');
    }
})

.controller('DashCtrl', function ($scope) {})

.controller('scanBarcode', function ($scope, $cordovaBarcodeScanner, $http){
  var usr = window.localStorage.getItem("username");

  var time = window.localStorage.getItem("time");
  var T_time = new Date(time);
  var timea = T_time.getMilliseconds();
  var timeNow = new Date();
  var timeNowb = timeNow.getMilliseconds();
  var timeOut = timeNowb - timea;

  //time in miliseconds (6 hours)
  if (timeNow > 3600000) {
    window.localStorage.setItem("username", 'null');
  }

  var usr = window.localStorage.getItem("username");

  if (usr === null) {
    $state.go('login');
  }else{
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
  }
})

.controller('order', function ($scope, buyProduct, $state, $stateParams, $window, $ionicPopup) {
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

      $state.go('dash');

    }).error(function (data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error!',
          template: data
        });
    });
  }
})

.controller('sticker', function ($scope, printSticker, $state, $stateParams, $window, $ionicPopup) {
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

      $state.go('dash');

    }).error(function (data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: data
      });
    });
  }
})

.controller('vtoProx', function ($scope, setOutDate, $state, $stateParams, $ionicPopup, $cordovaDatePicker) {
  $scope.interno = $stateParams.interno;
  $scope.idstore = $stateParams.idstore;
  $scope.codigo = $stateParams.codigo;

  $scope.data = {};

  var usr = window.localStorage.getItem("username");

  $scope.pickAdate = function () {
    var options = {
      date: new Date(),
      mode: 'date', // or 'time'
      minDate: new Date() - 10000,
      allowOldDates: true,
      allowFutureDates: false,
      doneButtonLabel: 'DONE',
      doneButtonColor: '#F2F3F4',
      cancelButtonLabel: 'CANCEL',
      cancelButtonColor: '#000000'
    };

    $cordovaDatePicker.show(options).then(function (odate) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Enviar Fecha',
        template: '¿Esta seguro de enviar la siguiente fecha como próximo vencimiento?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          var date = odate;
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

            $state.go('dash');

          }).error(function (data) {
            var alertPopup = $ionicPopup.alert({
              title: 'Error',
              template: data
            });
          });
        }else{
          var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: 'No se ha enviado la fecha'
          });
        }
      });
    });
  }
})

.controller('minNum', function ($scope, getMinStock, $state, setMinNum, $stateParams, $ionicPopup) {
  var idstore = $stateParams.idstore;
  var interno = $stateParams.interno;

  $scope.data = {};

  getMinStock.minStock(idstore, interno).success(function (data) {

    $scope.idstore = idstore;
    $scope.idproduct = $stateParams.idprod;
    $scope.minWinter = data[0].st_minimoi;
    $scope.minSummer = data[0].st_minimo;

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

      $state.go('dash');

    }).error(function (data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: 'Se ha producido un error, vuelva a intentarlo'
      });
    });
  }
})

.controller('maxNum', function ($scope, getMaxStock, $state, setMaxNum, $stateParams, $ionicPopup) {
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

      $state.go('dash');

    }).error(function (data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: 'Se ha producido un error, vuelva a intentarlo'
      });
    });
  }
})