//cmf  edited
var app = angular.module("Blogger", ['ngRoute', 'ngResource', "Blogger.controllers", "Blogger.factories"]);

app.config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: 'views/welcome.html',
        controller: "WelcomeController"
    })
    .when('/compose', {
        templateUrl: "views/compose.html",
        controller: "ComposeController"
    })
    .when("/:id/update", {
        templateUrl: "views/updater.html",
        controller: "SingleController"
    })
    .when('/:id', {
        templateUrl: "views/blogPost.html",
        controller: "PostController"
    })
    .otherwise({
        redirectTo: '/'
    })
}]);