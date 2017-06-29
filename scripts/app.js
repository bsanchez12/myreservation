var app = angular.module('practica', ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "scripts/main/views/Login.html"
    })
    .when("/CodeCreator", {
        templateUrl : "scripts/codeCreate/views/CodeCreate.html"
    })
    .when("/UpdateBySerial", {
        templateUrl : "scripts/updatebyserials/views/UpdateBySerial.html"
    });
});