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
  )

/////////////////////////////////  CONTROLLERS  /////////////////////////////////
  .controller("MainCtrl", function ($scope, $http) {      //add $http   //MainCtrl - main.html - only needs "title"
    //MAIN GET
    $http
      .get("/api/title")                                  //app title
      .then(({ data: { title }}) =>                       //destructured from "data"
        $scope.title = title                              //rather than "data.data.title"
      )
  })


  .controller("HomeCtrl", function ($scope, $http) {      //HomeCtrl - homes.html - needs "title" and "data"

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






// // When ready to cardify?
// // https://material.angularjs.org/latest/demo/card
// angular.module('cardDemo1', ['ngMaterial'])

// .controller('AppCtrl', function($scope) {
//   $scope.imagePath = 'img/washedout.png';
// })
// .config(function($mdThemingProvider) {
//   $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
//   $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
//   $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
//   $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
// });
