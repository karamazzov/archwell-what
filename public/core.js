var ourApp = angular.module('ourApp', ['ui.router']); //dodao ui-router kao dependency nasoj aplikaciji

ourApp.config([  //quite self-explanatory
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){ //
    $stateProvider
      .state('home', {  //self-explanatory
        url: '/home',  //self-explanatory
        templateUrl: '/index.html', // ovo home.html je zapravo id script taga koji nosi template
        controller: 'mainController'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'contact.html'
      });


    $urlRouterProvider.otherwise('home'); //za ostale routove salje isto na home
  }]);




ourApp.controller('mainController', ['$scope', '$http',
 function($scope, $http) {
  $scope.tasty = 'Hola!';
}]);
