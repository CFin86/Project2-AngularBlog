angular.module("AngularBlog.directives", [])  
  .directive("myHeader", function(){
  return { 
    restrict: 'E', 
    templateUrl: './directives/header.html' 
  }; 
});
