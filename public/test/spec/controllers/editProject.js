// 'use strict';

describe('Controller: EditProject', function() {
  beforeEach(module('app'));
  
  var ctrl, scope, location, $httpBackend;
  
  beforeEach(inject(function(_$httpBackend_, $location, $routeParams, $controller, $injector, $rootScope) {
    $httpBackend = _$httpBackend_;
    $routeParams.id = 1;
    $httpBackend.expectGET('/projects/1').respond({id: 1, name: 'AngularJS'});
    scope = $rootScope.$new();
    location = $location;
    Project = $injector.get('Project');
    ctrl = $controller('EditProject', { $scope: scope, $location: location, $routeParams: $routeParams, Project: Project });
  }));

  it('should get project', function() {
    $httpBackend.flush();
    //scope.project.toBeDefined();
  });

  // Clear any http calls
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
});
