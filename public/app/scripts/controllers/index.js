app.controller('Index', function($scope, Project) {
  $scope.projects = Project.query();
});