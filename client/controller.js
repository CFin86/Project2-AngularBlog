angular.module("AngularBlog.controllers", [])

    .controller("ListController", ["$scope", 'Post', 'UserService', function($scope, Post, UserService){
       UserService.requireLogin();
        $scope.posts = Post.query();

    }])

    .controller("ComposeController", ["$scope", "Post",  "User", "Category", "UserService", 
    function ($scope, Post, Category, User, UserService) {
        UserService.requireLogin();

        $scope.categories = Category.query();
        $scope.users = User.query();

        $scope.createPost = function(){
            if($scope.userId == undefined ||$scope.categoryid== undefined){
                alert("You did not select a proper category or user");
                return;
            }
            new Post({
                title: $scope.title,
                userId: $scope.userId,
                categoryId: $scope.categoryId,
                content: $scope.content
            }).$save(function() {
                $location.path('/');
            })
        }
    }])

    .controller("UpdateController", ['$scope', "Post", 'Category', '$routeParams', 
    function ($scope, Post, Category, $routeParams) {
        $scope.post = Post.get({ id: $routeParams.id });
        $scope.categories =Category.query();
    
        $scope.updatePost = function () {
            $scope.post.$update(function() {
                window.location.pathname = "/" + $routeParams.id;
            })
        }
    }])


    .controller("SingleController", ["$scope", "$routeParams", "Post",
     function ($scope, $routeParams, Post) {
        $scope.post = Post.get({ id: $routeParams.id });
        $scope.deletePost = function(){
            if(confirm("Are yo sure you want to delete this post?")){
                $scope.post.$delete(function(){
                    window.location.pathname ="/"
                })
            }
        }
     }])


    .controller("LoginController", ['$scope', 'User',"$location", "UserService", 
    function($scope, User, $location, UserService){

            UserService.me().then(function() {
                redirect();
            });

            $scope.login = function(){
                UserService.login($scope.email, $scope.password).then(function(){
                    redirect();
                }, function(err){
                    console.log(err);
                })
            }

            function redirect(){
                var dest = $location.search().p;
                if (!dest) {dest = '/'};
                $location.path(dest).search('p', null).replace();
            }
    }])