// 'use strict';

describe('Controller: NewProject', function() {
  beforeEach(module('app'));

  var ctrl, scope, location, $httpBackend;

  beforeEach(inject(function($location, $controller, $injector, $rootScope) {
    scope = $rootScope.$new();
    location = $location;
    Project = $injector.get('Project');
    spyOn(Project, 'save').andCallFake(function(project, cb){
      cb({id: 1, name: 'AngularJS'});
    });
    ctrl = $controller('NewProject', { $scope: scope, $location: location, Project: Project });
  }));

  it('should save a project and change path', function() {
    // expect project to empty
    expect(scope.project).toEqual({});
    // set project ot object
    scope.project = { name: 'foo'};
    // spy on location.path method to be invoked on resource callback
    spyOn(location, 'path');
    // save
    scope.save();
    // confirm location path was called.
    expect(location.path).toHaveBeenCalled();
  });

});
