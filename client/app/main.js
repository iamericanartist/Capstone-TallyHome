"use strict"

angular
  .module("tallyHome", ["ngRoute"])                       //setup "tallyHome" app //inject ["ngRoute"] to make available to controllers

  .config($routeProvider =>
    $routeProvider
    //////////////////////////////  ROUTE PARAMS  //////////////////////////////
      .when("/", {                                        //when at "/"
        controller: "MainCtrl",                           //use "MainCtrl" controller (below)
        templateUrl: "partials/main.html",                //and show "main.html" partial
      })

      .when("/login", {
        controller: "LoginCtrl",
        templateUrl: "partials/login.html",
      })

      .when("/register", {
        controller: "RegisterCtrl",
        templateUrl: "partials/register.html",
      })

      .when("/homes", {
        controller: "HomeCtrl",
        templateUrl: "partials/homes.html",
      })
      
      .when("/logout", {
        controller: "LogoutCtrl",
        templateUrl: "partials/logout.html",
      })
      .otherwise ({
        redirectTo: "/"
      })
  )

/////////////////////////////////  CONTROLLERS  /////////////////////////////////
  ///////////////////////////  MainCtrl  ///////////////////////////
  .controller("MainCtrl", function ($scope, $http) {        //MainCtrl - main.html - only needs "title"
    $scope.welcome = "Tally Ho there!"
    $http
      .get("/api/title")                                    //app title
      .then(({ data: { title }}) =>                         //destructured from "data"
        $scope.title = title                                //rather than "data.data.title"
      )
      console.log("MAIN VIEW")
  })


  ///////////////////////////  LoginCtrl  ///////////////////////////
  .controller("LoginCtrl", function ($scope, $http) {
    $http
      .get("/api/title")
      .then(({ data: { title }}) =>
        $scope.title = title
      )
      console.log("LOGIN VIEW")
  })


  ///////////////////////////  RegisterCtrl  ///////////////////////////
  .controller("RegisterCtrl", function ($scope, $http) {
    $http
      .get("/api/title")
      .then(({ data: { title }}) =>
        $scope.title = title
      )
      console.log("REGISTER VIEW")
  })



  ///////////////////////////  HomeCtrl  ///////////////////////////
  .controller("HomeCtrl", function ($scope, $http) {      //HomeCtrl - homes.html - needs "title" and "data"
    $scope.sendHome = () => {
      const home =  {
        userId: $scope.userId,
        homeName: $scope.homeName,
        moveIn: $scope.moveIn,
        homeEvent: $scope.homeEvent
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
      console.log("HOME VIEW")
  })


  ///////////////////////////  LogoutCtrl  ///////////////////////////
  .controller("LogoutCtrl", function ($scope, $http) {
    $http
      .get("/api/title")
      .then(({ data: { title }}) =>
        $scope.title = title
      )
      console.log("LOGOUT VIEW")
  })

