angular.module('starter.services', [])

.service('LoginService', function ($q, $http) {
  return {
    loginUser: function(name, pw) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      $http.post('url' + name + '/' + pw).then(
        function (resp) {
          var auth = resp.data;

          if (auth != '') {
            deferred.resolve(auth);
          } else {
            deferred.reject('Usuario y/o Contraseña invalidas');
          }
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

.service('buyProduct', function ($http, $ionicPopup, $q) {
  return {
    buyOrder: function (interno, usr, cant, idstore) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      var urlReq = 'url';

      $http.post(urlReq + interno + '/' + usr + '/' + cant + '/' + idstore).then(
        function (resp) {
          var response = resp.data;

          if (response != '') {
            deferred.resolve(response);
          }else{
            deferred.reject(response);
          }
        }
      )

      promise.success = function (fn) {
        promise.then(fn);
        return promise;
      }

      promise.error = function (fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
})

.service('printSticker', function ($http, $ionicPopup, $q) {
  return {
    pSticker: function (usr, interno) {
      
    }
  }
})

.service('setOutDate', function ($http, $ionicPopup, $q) {
  return {
    sDate: function (usr, interno, date) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      var urlReq = 'url';

      $http.post(urlReq + interno + '/' + usr + '/' + date).then(
        function (resp) {
          var response = resp.data;

          if (response != '') {
            deferred.resolve(response);
          }else{
            deferred.reject(response);
          }
        }
      )

      promise.success = function (fn) {
        promise.then(fn);
        return promise;
      }

      promise.error = function (fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
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