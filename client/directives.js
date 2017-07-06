 angular.module("AngularBlog.directives", [])
   .directive("blogPost", function(){
        return {
            templateUrl: "../directives/post.html",
            restrict: "E",
           
        }
    });