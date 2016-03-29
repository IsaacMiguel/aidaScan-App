angular.module('starter.services', [])

.service('LoginService', function ($q, $http, $window, $state) {
  return {
    loginUser: function(name, pw) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      var url = window.localStorage.getItem("logon");
      var urlReq = url + 'loginapp/authenticate/' + name + '/' + pw;

        $http.get( urlReq ).then(
        function (resp) {
          var auth = resp.data;

          if (auth != 'false') {
            deferred.resolve(auth);
          } else {
            deferred.reject('Usuario y/o Contraseña invalidas');
          }
        },function (error) {
          alert('Hubo un error, vuelva a intentarlo. Asegurese de haber seleccionado el logeo correcto.');

          window.localStorage.clear();
          $state.go('login');
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

.service('buyProduct', function ($http, $ionicPopup, $q, $window) {
  return {
    buyOrder: function (interno, usr, cant, idstore) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      var url = window.localStorage.getItem("logon");

      var urlReq = 'loginapp/orderProduct/';

      $http.post( url + urlReq + interno + '/' + usr + '/' + cant + '/' + idstore).then(
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

.service('printSticker', function ($http, $ionicPopup, $q, $window) {
  return {
    pSticker: function (usr, interno) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      var url = window.localStorage.getItem("logon");

      var urlReq = 'loginapp/printSticker/';

      $http.post( url + urlReq + usr + '/' + interno).then(
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

.service('setOutDate', function ($http, $ionicPopup, $q, $window) {
  return {
    sDate: function (usr, interno, date) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      var url = window.localStorage.getItem("logon");

      var urlReq = 'loginapp/setOutdate/';

      $http.post(url + urlReq + interno + '/' + usr + '/' + date).then(
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

.service('getMinStock', function ($http, $ionicPopup, $q, $window) {
  return {
    minStock: function (idstore, interno) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      var url = window.localStorage.getItem("logon");

      var urlReq = 'loginapp/getMinStock/';

      $http.post(url + urlReq + idstore + '/' + interno).then(
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

.service('setMinNum', function ($http, $ionicPopup, $q, $window) {
  return {
    sMin: function (idstore, interno, cantMinWinter, cantMinSummer) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      var url = window.localStorage.getItem("logon");

      var urlReq = 'loginapp/setMinStock/';

      $http.post(url + urlReq + idstore + '/' + interno + '/' + cantMinWinter + '/' + cantMinSummer).then(
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

.service('getMaxStock', function ($http, $ionicPopup, $q, $window) {
  return {
    maxStock: function (idstore, interno) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      var url = window.localStorage.getItem("logon");

      var urlReq = 'loginapp/getMaxStock/';

      $http.post(url + urlReq + idstore + '/' + interno).then(
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

.service('setMaxNum', function ($http, $ionicPopup, $q, $window) {
  return {
    sMax: function (idstore, interno, cantMaxWinter, cantMaxSummer) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      var url = window.localStorage.getItem("logon");

      var urlReq = 'loginapp/setMaxStock/';

      $http.post(url + urlReq + idstore + '/' + interno + '/' + cantMaxWinter + '/' + cantMaxSummer).then(
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