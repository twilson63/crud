// 'use strict';

describe('Controller: EditProject', function() {
  beforeEach(module('app'));

  var ctrl, scope, location;

  beforeEach(inject(function($location, $controller, $injector, $rootScope) {
    scope = $rootScope.$new();
    location = $location;
    Project = $injector.get('Project');
    spyOn(Project, 'get').andCallFake(function(id, cb){
      cb({id: 1, name: 'AngularJS'});
    });
    ctrl = $controller('EditProject', { $scope: scope, $location: location, Project: Project });
  }));

  it('should get recent Project', function(){
    expect(scope.project.name).toEqual('AngularJS')
  });

  it('isClean should return true', function() {
    expect(scope.isClean()).toEqual(true);
  });

  it('isClean should return false', function() {
    scope.project.name = 'Rails';
    expect(scope.isClean()).toEqual(false);
  });

  it('should save project', function() {
    spyOn(scope.project, 'update').andCallFake(function(cb){
      cb({id: 1, name: 'AngularJS'});
    });
    spyOn(location, 'path');
    scope.save();
    expect(location.path).toHaveBeenCalled();
  });
});
