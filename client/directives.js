 angular.module("AngularBlog.directives", [])
   .directive("blogPost", function(){
        return {
            templateUrl: "../directives/post.html",
            restrict: "E",
           
        }
    })
    
    .directive("singlePost", function(){
        return {
            templateUrl: "../directives/single.html",
            restrict: "E",
        }
    });