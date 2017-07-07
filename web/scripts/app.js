var app = angular.module('evento', ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "app/views/login/login.html"
    })   
});