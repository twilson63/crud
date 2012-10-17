// 'use strict';

describe('Controller: NewProject', function() {
  beforeEach(module('app'));
  
  var ctrl, scope, location, $httpBackend;
  
  beforeEach(inject(function(_$httpBackend_, $location, $controller, $injector, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectPOST('/projects').respond({id: 1, name: 'AngularJS'});
    scope = $rootScope.$new();
    location = $location;
    Project = $injector.get('Project');
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
    $httpBackend.flush();
    // confirm location path was called.
    expect(location.path).toHaveBeenCalled();
  });

  // Clear any http calls
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
});
