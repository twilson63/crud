var app = angular.module('app', ['ngResource'])
  .config(function($routeProvider){
    $routeProvider
      .when('/', { controller: 'Index', templateUrl: '/app/views/index.html' })
      .when('/new', { controller: 'NewProject', templateUrl: '/app/views/details.html'})
      .when('/edit/:id', {controller: 'EditProject', templateUrl: '/app/views/details.html'});
  });
