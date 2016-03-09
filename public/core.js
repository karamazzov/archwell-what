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
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'contact.html',
        controller: 'contactController'
      })
      .state('triangle',{
        url: '/thanks',
        templateUrl: 'thanks.html',
        controller: 'trinity'
      });


    $urlRouterProvider.otherwise('home'); //za ostale routove salje isto na home
  }]);




ourApp.controller('mainController', ['$scope', '$http',
 function($scope, $http) {


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

ourApp.controller('trinity', ['$scope', '$http',
function($scope, $http) {



}]);
