"use strict"

angular
  .module("tallyHome", [])
  .controller("main", function ($scope, $http) {          //add $http
    $http
      .get("/api/title")
      .then(({ data: { title }}) =>                       //destructured from "data"
        $scope.title = title                              //rather than "data.data.title"
      )
  })

