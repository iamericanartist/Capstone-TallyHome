"use strict"

// angular
//   .module("MyApp",["ngMaterial", "ngMessages", "material.svgAssetsCache"])
//   .controller("AppCtrl", function($scope) {
//     $scope.myDate = new Date();
// });


angular
  .module("tallyHome", ["ngRoute"])                       //setup "tallyHome" app //inject ["ngRoute"] to make available to controllers

  .config($routeProvider =>
    $routeProvider
    /////////////////////////////////  ANGULAR ROUTES  /////////////////////////////////
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
  .controller("MainCtrl", function ($scope, $http) {      //add $http   //MainCtrl - main.html - only needs "title"
    //MAIN GET
    $http
      .get("/api/title")                                    //app title
      .then(({ data: { title }}) =>                         //destructured from "data"
        $scope.title = title                                //rather than "data.data.title"
      )
      console.log("MAIN VIEW")
  })



  ///////////////////////////  LoginCtrl  ///////////////////////////
  .controller("LoginCtrl", function ($scope, $http, $location) {

  $scope.loginUser = () => {
      const userLogin =  {
        email: $scope.email,
        password: $scope.password
      }

      $http
        .post("/api/login", userLogin)
        .then((response) => {
          console.log("asdf", response);
          if (response.data.user) {

            $location.path("#/homes")            
          } else {
            $scope.statusMessage = response.data.message
          }
        })
        .catch(console.error)
    }
      console.log("LOGIN VIEW")
  })



  ///////////////////////////  RegisterCtrl  ///////////////////////////
  .controller("RegisterCtrl", function ($scope, $http, $location) {
  $scope.users = []
  $scope.statusMessage = null

  $scope.registerUser = () => {
    if ($scope.password === $scope.confirmation ) {
      const newUser =  {
        email: $scope.email,
        password: $scope.password
      }
      //HOMES POST
      $http
        .post("/api/register", newUser)
        .then((user) => {
          if (user) {
            $scope.users.push(newUser)
            $location.path("#/login")            
          }
        })
        .catch(console.error)
      $scope.statusMessage = "Passwords match"
        } 
        else 
        {
          $scope.statusMessage = "Passwords do not match"
          $scope.password = ""
          $scope.confirmation = ""
        }
    }
      console.log("REGISTER VIEW")
  })



  ///////////////////////////  HomeCtrl  ///////////////////////////
  .controller("HomeCtrl", function ($scope, $http) {      //HomeCtrl - homes.html - needs "title" and "data"
    $scope.homes = []

    $scope.sendHome = () => {

      const home =  {
        userId: $scope.userId,
        homeName: $scope.homeName,
        moveIn: $scope.moveIn,
        homeEvent: $scope.homeEvent,
        eventDate: $scope.eventDate
      }
      $http
        .post("/api/homes", home)
        .then(() => $scope.homes.push(home))
        .catch(console.error)
    }

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

