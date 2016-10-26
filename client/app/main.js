"use strict"

angular
  .module("tallyHome", ["ngRoute"])                       //setup "tallyHome" app //inject ["ngRoute"] to make available to controllers

  .config($routeProvider =>
    $routeProvider
///////////////////////////////////  ROUTES  ///////////////////////////////////
      .when("/", {                                        //when at "/"
        controller: "MainCtrl",                           //use "MainCtrl" controller (below)
        templateUrl: "partials/main.html",                //and show "main.html" partial
      })

      .when("/homes", {
        controller: "HomeCtrl",
        templateUrl: "partials/homes.html",
      })
  )

/////////////////////////////////  CONTROLLERS  /////////////////////////////////
  .controller("MainCtrl", function ($scope, $http) {      //add $http
    $http
      .get("/api/title")
      .then(({ data: { title }}) =>                       //destructured from "data"
        $scope.title = title                              //rather than "data.data.title"
      )
  })

  .controller("HomeCtrl", function ($scope, $http) {
    $http
      .get("/api/homes")
      .then(({ data: { homes }}) =>
        $scope.homes = homes
      )
  })
