angular.module('starter.services', [])

.service('LoginService', function ($q, $http) {
  return {
    loginUser: function(name, pw) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      $http.post(url + name + '/' + pw).then(
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
      var urlReq = ur;

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
      var deferred = $q.defer();
      var promise = deferred.promise;
      var urlReq = url;

      $http.post(urlReq + usr + '/' + interno).then(
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

.service('setOutDate', function ($http, $ionicPopup, $q) {
  return {
    sDate: function (usr, interno, date) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      var urlReq = url;

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

.service('getMinStock', function ($http, $ionicPopup, $q) {
  return {
    minStock: function (idstore, interno) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      var urlReq = url;

      $http.post(urlReq + idstore + '/' + interno).then(
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

.service('setMinNum', function ($http, $ionicPopup, $q) {
  return {
    sMin: function (idstore, interno, cantMinWinter, cantMinSummer) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      var urlReq = url;

      $http.post(urlReq + idstore + '/' + interno + '/' + cantMinWinter + '/' + cantMinSummer).then(
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

.service('getMaxStock', function ($http, $ionicPopup, $q) {
  return {
    maxStock: function (idstore, interno) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      var urlReq = url;

      $http.post(urlReq + idstore + '/' + interno).then(
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

.service('setMaxNum', function ($http, $ionicPopup, $q) {
  return {
    sMax: function (idstore, interno, cantMaxWinter, cantMaxSummer) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      var urlReq = url;

      $http.post(urlReq + idstore + '/' + interno + '/' + cantMaxWinter + '/' + cantMaxSummer).then(
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