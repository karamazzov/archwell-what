var ourApp = angular.module('ourApp', ['ui.router']); //dodao ui-router kao dependency nasoj aplikaciji
var animateApp = angular.module('animateApp', ['ngAnimate']);

ourApp.config([  //quite self-explanatory
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){ //
    $stateProvider
      .state('home', {  //self-explanatory
        url: '/home',  //self-explanatory
        templateUrl: 'home.html', // ovo home.html je zapravo id script taga koji nosi template
        controller: 'mainController'
      })  // izbrisati ovo?
      .state('contact', {
        views: {
          'contact': {
            url: '/contact',
            templateUrl: 'contact.html',
            controller: 'contactController'
          }
        }
      })
      .state('whatwedo1', {
        url: '/whatwedo1',
        templateUrl: 'whatwedo1.html'
      })
      .state('whatwedo2', {
        url: '/whatwedo2',
        templateUrl: 'whatwedo2.html'
      })
      .state('whatwedo3', {
        url: '/whatwedo3',
        templateUrl: 'whatwedo3.html'
      })

    $urlRouterProvider.otherwise('home'); //za ostale routove salje isto na home
  }]);


ourApp.controller('mainController', ['$scope', '$http',
 function($scope, $http) {
  $http.get('/home')
  $scope.name = "Mikula";

}]);

ourApp.controller('homeController', ['$scope', function($scope) {

}]);

ourApp.controller('contactController', ['$scope', '$http',
 function($scope, $http) {

   $scope.addMsg = function(){
     $scope.messages.push({
       name: $scope.user.name,
       email: $scope.user.email,
       message: $scope.user.message,
       sent:true,

     });
   };

   $scope.ThankYou = false;
   $scope.ShowThanks = function() {
     $scope.ThankYou = $scope.ThankYou ?
     false : true;
   };


   $scope.messages = [

   ];


}]);
