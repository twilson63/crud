// 'use strict';

describe('Controller: Index', function() {
  beforeEach(module('app'));
  
  var ctrl, scope, $httpBackend;
  
  beforeEach(inject(function(_$httpBackend_, $controller, $injector, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/projects').respond([{id: 1, name: 'AngularJS'}, {id: 2, name: 'Rails'}]);
    scope = $rootScope.$new();
    Project = $injector.get('Project');
    ctrl = $controller('Index', { $scope: scope, Project: Project });
  }));

  it('should query project', function() {
    expect(scope.projects).toEqual([]);
    $httpBackend.flush();
    expect(scope.projects[0].name).toEqual('AngularJS');
    expect(scope.projects[1].name).toEqual('Rails');
  });

  // Clear any http calls
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
});
