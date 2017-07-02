
///has not be touched
//Controllers updated
angular.module("Blogger.controllers", [])

    .controller("WelcomeController", [])

    .controller("ComposeController", ["$scope", "Chirp", "User", function ($scope, Chirp, User) {
        $scope.chirps = Chirp.query();
        $scope.users = User.query();
    }])

    .controller("SingleController", ['$scope', "Chirp", "$routeParams", function ($scope, Chirp, $routeParams) {

        $scope.chirp = Chirp.get({ id: $routeParams.id });

        $scope.deleteChirp = function () {
            $scope.chirp.$delete(function () {
                window.location.href = "http://localhost:3000/#!/chirps";
            })
        }

        $scope.goToUpdate = function () {
            window.location.href = "http://localhost:3000/#!/chirps/" + $routeParams.id + "/update";
        }
    }])

    .controller("PostController", ["$scope", "$routeParams", "Chirp", function ($scope, $routeParams, Chirp) {
        $scope.chirp = Chirp.get({ id: $routeParams.id });

        $scope.updateChirp = function () {
            $scope.chirp.$update(function() {
                window.location.href = "http://localhost:3000/#!/chirps";
            })
        }
    }])