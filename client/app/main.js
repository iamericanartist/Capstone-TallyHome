"use strict"

angular
  .module("tallyHome", ["ngRoute","ngStorage","ngMaterial"])  //setup "tallyHome" app //inject ["ngRoute"] to make available to controllers

  .config(($routeProvider) =>  {                              //add ", $locationProvider" back to implement html5mode (also see index.html)
    // $locationProvider.html5Mode(true)
    // $locationProvider.hashPrefix = "/"
    $routeProvider
    /////////////////////////////////  ANGULAR ROUTES  /////////////////////////////////
      .when("/", {                                            //when at "/"
        controller: "MainCtrl",                               //use "MainCtrl" controller (below)
        templateUrl: "partials/main.html",                    //and show "main.html" partial
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
      .when("/editHome", {
        controller: "EditHomeCtrl",
        templateUrl: "partials/editHome.html",
      })
      .when("/newEvent", {
        controller: "NewEventCtrl",
        templateUrl: "partials/newEvent.html",
      })
      .when("/logout", {
        controller: "LogoutCtrl",
        templateUrl: "partials/logout.html",
      })
      .otherwise ({
        redirectTo: "/"
      })
  })

/////////////////////////////////  CONTROLLERS  /////////////////////////////////
  ///////////////////////////  MainCtrl  ///////////////////////////
  .controller("MainCtrl", function ($scope, $http) {
    $http
      .get("/api/title")                                      //app title
      .then(({ data: { title }}) =>                           //destructured from "data"
        $scope.title = title                                  //rather than "data.data.title"
      )
      console.log("MAIN VIEW")
  })



  ///////////////////////////  NavCtrl  ///////////////////////////
  .controller("NavCtrl", function ($scope, $http, $localStorage) {
    $scope.user = $localStorage.user
})

 

  ///////////////////////////  LoginCtrl  ///////////////////////////
  .controller("LoginCtrl", function ($scope, $http, $location, $localStorage, $route, $rootScope) {
  // $scope.$storage = $localStorage
  $scope.statusMessage = null
  console.log("$localStorage pre http", $localStorage.user)

  $scope.loginUser = () => {
      const userLogin =  {
        email: $scope.email,
        password: $scope.password
      }

      $http
        .post("/api/login", userLogin)
        .then((response) => {
          console.log("LOGIN RESPONSE", response)
          if (response.data.user) {
            $localStorage.user = response.data.user           //takes email from response and adds it to the $rootScope for "cookie"-ish session
            $rootScope.user = response.data.user              //takes email from response and adds it to the $rootScope for "cookie"-ish session
            console.log("$localStorage.user DURING HTTP", $localStorage.user)
            $route.reload()
            $location.path("/homes")                          //redirects user to "homes.html"
          } else {
            $scope.statusMessage = response.data.message      //if error, render message to user
            $scope.password = ""
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
  .controller("HomeCtrl", function ($scope, $http, $location, $route, $localStorage) {
    $scope.homes = []

    $scope.sendHome = () => {
      const home =  {
        userId: $localStorage.user._id,
        homeName: $scope.homeName,
        moveIn: $scope.moveIn,
        homeEvent: [{
          eventName: $scope.eventName,
          eventDate: $scope.eventDate,
          eventInfo: $scope.eventInfo
        }]
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

    $scope.removeHome = (id) => {
      console.log("~MAIN.JS~ removeHome: ", id)
      $http
        .delete(`/api/homes/${id}`)
        .then(reloadPage())
    }

    $scope.editHome = (id) => {
      console.log("~MAIN.JS~ editHome: ", id)
      $location.path(`/editHome/${id}`)
    }


    ///////////////////////////  RELOADPAGE FN  ///////////////////////////
    function reloadPage() {
      $http
        .get("/api/homes")
        .then(({ data: { homes }}) => $scope.homes = homes)
      $scope.userId = ""
      $scope.homeName = ""
      $scope.moveIn = ""
      $scope.homeEvent = ""
      $scope.eventDate = ""
    }
    reloadPage()
  })



  ///////////////////////////  LogoutCtrl  ///////////////////////////
  .controller("LogoutCtrl", function ($scope, $http, $localStorage, $location) {
    $scope.logout = () => {
      console.log("User logging out:", $localStorage.user)
      delete $localStorage.user
      $location.path(`/home`)
      console.log("Current user:", $localStorage.user)
    }
  })



  ///////////////////////////  EditHomeCtrl  ///////////////////////////
  .controller("EditHomeCtrl", function ($scope, $http) {
    $http
      .get("/api/title")
      .then(({ data: { title }}) =>
        $scope.title = title
      )
      console.log("EDITHOME VIEW")
  })



  ///////////////////////////  NewEventCtrl  ///////////////////////////
  .controller("NewEventCtrl", function ($scope, $http, $localStorage) {
    $scope.homeEvent = []
    $scope.addEvent = () => {
      const newEvent = {
        userId: $localStorage.user._id,
        homeName: $scope.homeName,
        moveIn: $scope.moveIn,
        homeEvent: $localStorage.homeEvent,         ///////////////////////////  This is an existing [array...]  ///////////////////////////
        eventDate: $scope.eventDate,
      }
      $http
        .post("/api/newEvent", newEvent)
        .then(() => $scope.homeEvent.push(newEvent))
        .catch(console.error)
    }

    $http
      .get("/api/title")
      .then(({ data: { title }}) =>
        $scope.title = title
      )
      console.log("NEWEVENT VIEW")
  })

