app.controller('NewProject', function($scope, $location, Project) {
  $scope.project = {};
  $scope.save = function() {
    Project.save($scope.project, function(){
      $location.path('/');
    });
  }
});