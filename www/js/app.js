// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

 .state('dash', {
    url: '/dash',
    templateUrl: 'templates/dash.html',
    controller: 'scanBarcode'
  })

 .state('order', {
    url: '/order/:idstore/:idprod',
    templateUrl: 'templates/order.html',
    controller: 'order'
  })

 .state('sticker', {
    url: '/sticker/:idstore/:idprod',
    templateUrl: 'templates/sticker.html',
    controller: 'sticker'
  })

 .state('vtoProx', {
    url: '/vtoProx/:idstore/:idprod',
    templateUrl: 'templates/vtoProx.html',
    controller: 'vtoProx'
  })

 .state('maxNum', {
    url: '/maxNum/:idstore/:idprod',
    templateUrl: 'templates/maxNum.html',
    controller: 'maxNum'
  })

  .state('minNum', {
    url: '/minNum/:idstore/:idprod',
    templateUrl: 'templates/minNum.html',
    controller: 'minNum'
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});