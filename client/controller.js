angular.module("AngularBlog.controllers", [])

    .controller("ListController", ["$scope", 'Post', 'UserService', "Category", "$routeParams",
        function ($scope, Post, UserService, Category, $routeParams) {
            UserService.requireLogin();
            $scope.posts = Post.query();
            $scope.categories = Category.query();


            $scope.logout = function () {
                UserService.logout();
                window.location.pathname = "/login";

            };

            $scope.compose = function () {
                window.location.pathname = "/compose";
            };

            $scope.singleFunc = function () {
                //window.location.pathname = "/" + $routeParams.id;
                console.log($scope.posts);
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

    .controller("UpdateController", ['$scope', "Post", "User", "Category", "UserService",
        function ($scope, Post, Category, $routeParams) {
            $scope.post = Post.get({ id: $routeParams.id });
            $scope.categories = Category.query();

            $scope.updatePost = function () {
                $scope.post.$update(function () {
                    window.location.pathname = "/" + $routeParams.id;
                    //match this controller with your "SingleController"    
                })
            }
        }])


    .controller("SingleController", ["$scope", "$routeParams", "$location",
        "Post", "UserService", "Category", "User",
        function ($scope, $routeParams, $location, Post, UserService, Category, User) {
            // $scope.posts = Post.query();
            $scope.posts = Post.get({ id: $routeParams.id });

            console.log($scope.posts);
            $scope.direct = function () {
                window.location.pathname = "./" + $routeParams.id + "/update";
            }

            $scope.deletePost = function () {
                if (confirm("Are you sure you want to delete this post?")) {
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
            $scope.newUser = function () {
                window.location.pathname = "/newUser"
            };

            function redirect() {
                var dest = $location.search().p;
                if (!dest) { dest = '/' };
                $location.path(dest).search('p', null).replace();
            }
        }])

    .controller("UserController", ['$scope', "User", "UserService",
        function ($scope, User, UserService) {
            UserService.requireLogin();
            $scope.user = Post.get({id: $routeParams.id});

            $scope.createUser = function () {
                new User({
                    firstname: $scope.firstname,
                    lastname: $scope.lastname,
                    email: $scope.email,
                    password: $scope.password
                }).$save(function () {
                    $scope.users = User.query();
                })
            }

            $scope.deleteUser = function () {
                new User().$delete({ id: id });
            }
            $scope.editEmail = function (id) {
                var newEmail = prompt("Enter a new email address for user with id of " + id);
                if (newEmail) {
                    var user = User.get({ id: id });
                    user.email = newEmail;
                    User.update({ id: id }, user);
                }
            }
             $scope.editPassword = function (id) {
                var newPass = prompt("Enter a new password for user with id of " + id);
                if (newPass) {
                    var user = User.get({ id: id });
                    user.password = newPass;
                    User.update({ id: id }, user);
                }
            }

        }])

    // .controller("NewUserController", ['$scope', 'User', '$location', 'UserService',
    //     function ($scope, User, $location, UserService) {
    //         UserService.requireLogin();

    //     }])


    // SEOService.setSEO({
    //     //friday lecture add this later
	// 	title: 'Contact Us',
	// 	image: 'http://' + $location.host() + '/images/contact-us-graphic.png',
	// 	url: $location.url(),
	// 	description: 'A description of this page'
	// })
// }]);
