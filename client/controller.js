angular.module("AngularBlog.controllers", ['ngRoute'])
    //LIST CONTROLLER LIST CONTROLLER LIST CONTROLLER
    .controller("ListController", ["$scope", 'Post', 'UserService', "Category", "$routeParams", "SEOService", "$location",
        function ($scope, Post, UserService, Category, $routeParams, SEOService, location) {
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
            $scope.admin = function () {
                window.location.pathname = "./user";
            };
                SEOService.setSEO({
                    title: 'Blogular with SEO',
                    image: 'https://tinyurl.com/yd8o2lwr',
                    url: location.url(),
                    description: 'This is a blog to post all of your negative feelings'
                });
            }])
    //COMPOSE CONTROLLER COMPOSE CONTROLLER COMPOSE CONTROLLER
    .controller("ComposeController", ["$scope", "Post", "User", "Category", "UserService", "SEOService", "$location",
        function ($scope, Post, User, Category, UserService, SEOService, $location) {
            UserService.requireLogin();

            $scope.categories = Category.query();
            $scope.users = User.query();

            console.log($scope.categories);
            //console.log($scope.users);

            $scope.createPost = function () {
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
            };

            SEOService.setSEO({
                title: 'Blogular with SEO',
                image: 'https://tinyurl.com/yd8o2lwr',
                url: $location.url(),
                description: 'This is a blog to post all of your negative feelings'
            });
        }])
    //UPDATE CONTROLLER UPDATE CONTROLLER UPDATE CONTROLLER 
    .controller("UpdateController", ['$scope', "Post", "Category", "UserService", "SEOService", "$routeParams",
        function ($scope, Post, Category, UserService, SEOService, $routeParams) {
            $scope.post = Post.get({ id: $routeParams.id });
            $scope.categories = Category.query();

            $scope.updatePost = function () {
                $scope.post.$update(function () {
                    window.location.pathname = "/" + $routeParams.id;

                });
            };

            $scope.home = function () {
                window.location.pathname = "/";
            };


            SEOService.setSEO({
                title: 'Blogular with SEO',
                image: 'https://tinyurl.com/yd8o2lwr',
                url: $routeParams.url,
                description: 'This is a blog to post all of your negative feelings'
            });

        }])
    //SINGLE CONTROLLER SINGLE CONTROLLER SINGLE CONTROLLER 
    .controller("SingleController", ["$scope", "$routeParams", "$location", "SEOService",
        "Post", "UserService", "Category", "User",
        function ($scope, $routeParams, $location, SEOService, Post, UserService, Category, User) {
            $scope.posts = Post.query();
            $scope.posts = Post.get({ id: $routeParams.id });

            console.log($scope.posts);
            $scope.direct = function () {
                window.location.pathname = "./" + $routeParams.id + "/update";
            };

            $scope.deletePost = function () {
                if (confirm("Are you sure you want to delete this post?")) {
                    $scope.posts.$delete(function () {
                        window.location.pathname = "/";
                    });
                }
            };

            SEOService.setSEO({
                title: 'Blogular with SEO',
                image: 'https://tinyurl.com/yd8o2lwr',
                url: $location.url(),
                description: 'This is a blog to post all of your negative feelings'
            })
        }])

    //LOGIN CONTROLLER LOGIN CONTROLLER LOGIN CONTROLLER 
    .controller("LoginController", ['$scope', 'User', "$location", "UserService", "SEOService",
        function ($scope, User, $location, UserService, SEOService) {

            UserService.me().then(function () {
                redirect();
            });

            $scope.login = function () {
                UserService.login($scope.email, $scope.password).then(function () {
                    redirect();
                }, function (err) {
                    console.log(err);
                });
            };
            $scope.newuser = function () {
                window.location.pathname = "/newuser";
            };

            function redirect() {
                var dest = $location.search().p;
                if (!dest) { dest = '/' };
                $location.path(dest).search('p', null).replace();
            };

            SEOService.setSEO({
                title: 'Blogular with SEO',
                image: 'https://tinyurl.com/yd8o2lwr',
                url: $location.url(),
                description: 'This is a blog to post all of your negative feelings'
            });
        }])
    //USER CONTROLLER USER CONTROLLER USER CONTROLLER 
    .controller("UserController", ['$scope', "User", "UserService", "SEOService", "$location",
        function ($scope, User, UserService, SEOService, location) {
            UserService.requireLogin();
            $scope.user = User.query();

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

            SEOService.setSEO({
                title: 'Blogular with SEO',
                image: 'https://tinyurl.com/yd8o2lwr',
                url: $location.url(),
                description: 'This is a blog to post all of your negative feelings'
            });

        }])
    //UPDATE CONTROLLER UPDATE CONTROLLER UPDATE CONTROLLER 
    .controller("NewUserController", ['$scope', 'User', '$location', 'UserService', "SEOService",
        function ($scope, User, $location, UserService, SEOService) {
            $scope.user = User.query();
            UserService.birthUser();
            $scope.working = function () {
                console.log("yes your controller is working");
            }
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

            SEOService.setSEO({
                title: 'Blogular with SEO',
                image: 'https://tinyurl.com/yd8o2lwr',
                url: $location.url(),
                description: 'This is a blog to post all of your negative feelings'
            });
        }])