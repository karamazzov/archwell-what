
var app = angular.module('myApp'); //dodao ui-router kao dependency nasoj aplikaciji

app.controller('mailController', ['$scope', '$http',
 
function($scope, $http) {

  $http({
  	method: 'GET',
  	url: '/mails'
  }).
  then(function (response) {
  	$scope.mails = response.data;
  });

}]);
