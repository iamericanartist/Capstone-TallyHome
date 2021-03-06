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
      .when("/homes/:id", {
        controller: "AHomeCtrl",
        templateUrl: "partials/aHome.html",
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
  })



  ///////////////////////////  NavCtrl  ///////////////////////////
  .controller("NavCtrl", function ($scope, $http, $localStorage) {
    $scope.user = $localStorage.user
})

 

  ///////////////////////////  LoginCtrl  ///////////////////////////
  .controller("LoginCtrl", function ($scope, $http, $location, $localStorage, $route, $rootScope) {
  $scope.statusMessage = null

  $scope.loginUser = () => {
      const userLogin =  {
        email: $scope.email,
        password: $scope.password
      }

      $http
        .post("/api/login", userLogin)
        .then((response) => {
          if (response.data.user) {
            $localStorage.user = response.data.user           //takes email from response and adds it to the $rootScope for "cookie"-ish session
            $rootScope.user = response.data.user              //takes email from response and adds it to the $rootScope for "cookie"-ish session
            $route.reload()
            $location.path("/homes")                          //redirects user to "homes.html"
          } else {
            $scope.statusMessage = response.data.message      //if error, render message to user
            $scope.password = ""
          }
        })
        .catch(console.error)
    }
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
        .then((dbHome) => {
          $scope.homes.push(dbHome.data)
        })
        .catch(console.error)
    }

    $http
      .get("/api/homes")
      .then(({ data: { homes }}) =>
        $scope.homes = homes
      )

    $scope.removeHome = (id) => {
      $http
        .delete(`/api/homes/${id}`)
        .then(reloadPage())
    }

    $scope.openHome = (id) => {
      $location.path(`/homes/${id}`)
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
      delete $localStorage.user
      $location.path(`/home`)
    }
  })



  ///////////////////////////  aHomeCtrl  ///////////////////////////
  .controller("AHomeCtrl", function ($scope, $http, $routeParams, $localStorage) {
    $scope.home = null
    $http
      .post("/api/aHome", {id:$routeParams.id})
      .then((homeData) => $scope.home = homeData.data)
      .catch(console.error)


    $scope.addEvent = (id) => {
      const newEvent = {
        homeId: id,
        eventName: $scope.eventName,
        eventDate: $scope.eventDate,
        eventInfo: $scope.eventInfo
      }

   $scope.removeEvent = (id) => {
      $http      
        .delete(`/api/homeEvent.${id}`)                   ///////////////////////////  Needs Work!  ///////////////////////////
        .then(reloadPage())
    }

      $http
        .post("/api/newEvent", newEvent)
        .then((response) => {
          console.log("resp.data", response.data.homeEvent[response.data.homeEvent.length -1]);
          $scope.home.homeEvent.push(response.data.homeEvent[response.data.homeEvent.length -1])
          $scope.eventName = ""
          $scope.eventDate = ""
          $scope.eventInfo = ""
        })
        .catch(console.error)
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

