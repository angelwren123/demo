var app = angular.module("myApp", ["ngRoute"]);
app.config(function ($routeProvider) {
         $routeProvider
           .when("/", {
            templateUrl: "views/homepage.html?" + Math.random() ,
            controller:"trangchu",
            })
           .when("/gioithieu", {
             templateUrl: "views/gioithieu.html?" + Math.random() ,
             controller: "gioithieu"
           })
           .otherwise({
             redirectTo: "/",
           });
       });
