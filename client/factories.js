angular.module("Blogger.factories", [])

    .factory("User", ["$resource", function($resource) {
        return $resource("http://localhost:3000/api/users");
    }])

    .factory("Category", ["$resource", function($resource) {
        return $resource("http://localhost:3000/api/chirps/:id", 
        {
            id: "@id"
        },
        {
            'update': {method: "PUT"}
        })
    }])

    .factory("Post", ["$resource", function($resource) {
        
    }])