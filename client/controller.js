angular.module("AngularBlog.controllers", [])

    .controller("ListController", ["$scope", 'Post', 'UserService', "Category",
     function ($scope, Post, UserService, Category) {
        UserService.requireLogin();
        $scope.posts = Post.query();
         $scope.categories = Category.query();
        console.log($scope.posts);
        console.log($scope.categories);
            console.log($scope.users);
        $scope.redirect = function () {
            window.location.pathname = "/compose";
        }

    }])

    .controller("ComposeController", ["$scope", "Post", "User", "Category", "UserService", 
        function ($scope, Post, User, Category, UserService) {
            UserService.requireLogin();

            $scope.categories = Category.query();
            $scope.users = User.query();
    
            console.log($scope.categories);
            //console.log($scope.users);

            $scope.createPost = function () {
                console.log($scope.categoryId);
                if ($scope.userId == undefined || $scope.categoryId == undefined) {
                    alert("You did not select a proper category or user");
                    return;
                }
                new Post({
                    title: $scope.title,
                    userId: $scope.userId,
                    categoryId: $scope.categoryId,
                    content: $scope.content
                }).$save(function () {
                    window.location.pathname = '/';
                })
            }
        }])

    .controller("UpdateController", ['$scope', "Post", 'Category', '$routeParams',
        function ($scope, Post, Category, $routeParams) {
            $scope.post = Post.get({ id: $routeParams.id });
            $scope.categories = Category.query();

            $scope.updatePost = function () {
                $scope.post.$update(function () {
                    window.location.pathname = "/" + $routeParams.id;
                })
            }
        }])


    .controller("SingleController", ["$scope", "$routeParams", "Post",
        function ($scope, $routeParams, Post) {
            $scope.post = Post.get({ id: $routeParams.id });
            $scope.deletePost = function () {
                if (confirm("Are yo sure you want to delete this post?")) {
                    $scope.post.$delete(function () {
                        window.location.pathname = "/"
                    })
                }
            }
        }])


    .controller("LoginController", ['$scope', 'User', "$location", "UserService",
        function ($scope, User, $location, UserService) {

            UserService.me().then(function () {
                redirect();
            });

            $scope.login = function () {
                UserService.login($scope.email, $scope.password).then(function () {
                    redirect();
                }, function (err) {
                    console.log(err);
                })
            }

            function redirect() {
                var dest = $location.search().p;
                if (!dest) { dest = '/' };
                $location.path(dest).search('p', null).replace();
            }
        }])