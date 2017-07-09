var app = angular.module("AngularBlog", ['ngRoute', 'ngResource',
    "AngularBlog.controllers", "AngularBlog.factories",
    "AngularBlog.services", "AngularBlog.directives"])

app.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when("/", {
            templateUrl: 'views/list.html',
            controller: "ListController"
        })
        .when('/compose', {
            templateUrl: "views/compose.html",
            controller: "ComposeController"
        })
        .when('/login', {
            templateUrl: "views/login.html",
            controller: "LoginController"
        })
        .when('/newuser', {
            templateUrl: "views/newuser.html",
            controller: "NewUserController"
        }) 
         .when('/:id', {
            templateUrl: "views/single.html",
            controller: "SingleController"
        })
        .when("/:id/update", {
            templateUrl: "views/update.html",
            controller: "UpdateController"
        })
        .when('/:id/user', {
            templateUrl: "/views/user.html",
            controller: "UserController"
        })
        .otherwise({
            redirectTo: '/'
        });
}]);