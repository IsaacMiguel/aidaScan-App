angular.module('starter.services', [])

.service('LoginService', function ($q, $http) {
  return {
    loginUser: function(name, pw) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      $http.post('http://url/' + name + '/' + pw).then(
        function (resp) {
          var auth = resp.data;

          if (auth == 'true') {
            deferred.resolve('Bienvenido ' + name + '!');
          } else {
            deferred.reject('Wrong credentials.');
          }
          // For JSON responses, resp.data contains the result
        })
      
      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
})

.service('buyProduct', function ($http, $ionicPopup) {
  return {
    buyOrder: function (idstore, idproduct, cant) {
      var alertPopup = $ionicPopup.alert({
        title: 'Pedir',
        template: 'Se encargó ' + cant + ' unidades del producto para el almacen: ' + idstore + ' (falta hacer el backend)'
      });
    }
  }
})

.service('printSticker', function ($http, $ionicPopup) {
  return {
    pSticker: function (idstore, idproduct) {
      var alertPopup = $ionicPopup.alert({
        title: 'Imprimir',
        template: 'Se envió el pedido de impresion del producto ' + idproduct + ' (falta hacer el backend)'
      });
    }
  }
})

.service('setOutDate', function ($http, $ionicPopup) {
  return {
    sDate: function (idstore, idproduct, oDate) {
      var Day = oDate.getDate();
      var Month = oDate.getMonth();
      var Year = oDate.getFullYear();
      var dataDate = Day + '/' + Month + '/' + Year;
      
      var alertPopup = $ionicPopup.alert({
        title: 'fecha de vencimiento',
        template: 'Se guardo la fecha de vto. del producto ' + idproduct + ' a ' + dataDate + ' (falta hacer el backend)'
      });
    }
  }
})

.service('setMaxNum', function ($http, $ionicPopup) {
  return {
    sMax: function (idstore, idproduct, cant) {
      var alertPopup = $ionicPopup.alert({
        title: 'Stock Maximo',
        template: 'Se cambió el stock máximo del producto ' + idproduct + ' a ' + cant + ' (falta hacer el backend)'
      });
    }
  }
})

.service('setMinNum', function ($http, $ionicPopup) {
  return {
    sMin: function (idstore, idproduct, cant) {
      var alertPopup = $ionicPopup.alert({
        title: 'Stock Minimo',
        template: 'Se cambió el stock minimo del producto ' + idproduct + ' a ' + cant + ' (falta hacer el backend)'
      });
    }
  }
})