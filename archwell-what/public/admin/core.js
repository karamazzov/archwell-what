var app = angular.module('myApp', []);
app.controller('mailsCtrl', function($scope, $http) {
  $http.get("/mails").then(function (response) {
      $scope.mails = response.data;
  });
});