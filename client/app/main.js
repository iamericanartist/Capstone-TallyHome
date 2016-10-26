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
  //MainCtrl - main.html - only needs "title"
  .controller("MainCtrl", function ($scope, $http) {      //add $http
    //MAIN GET
    $http
      .get("/api/title")                                  //app title
      .then(({ data: { title }}) =>                       //destructured from "data"
        $scope.title = title                              //rather than "data.data.title"
      )
  })


  //HomeCtrl - homes.html - needs "title" and "data"
  .controller("HomeCtrl", function ($scope, $http) {
    $scope.sendHome = () => {
      
      const home =  {
        homeEvent: $scope.homeEvent,
      }
      //HOMES POST
      $http
      .post("/api/homes", home)
      .then(() => $scope.homes.push(home))
      .catch(console.error)
    }
    //HOMES GETS
    $http
      .get("/api/title")
      .then(({ data: { title }}) =>
        $scope.title = title
      )

    $http
      .get("/api/homes")
      .then(({ data: { homes }}) =>
        $scope.homes = homes
      )
  })
