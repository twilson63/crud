// 'use strict';

describe('Controller: Index', function() {
  beforeEach(module('app'));

  var ctrl, scope;

  beforeEach(inject(function($controller, $injector, $rootScope) {
    scope = $rootScope.$new();
    Project = $injector.get('Project');
    spyOn(Project, 'query').andReturn([{id: 1, name: 'AngularJS'},{id: 2, name: 'Rails'}]);
    ctrl = $controller('Index', { $scope: scope, Project: Project });
  }));

  it('should query project', function() {
    expect(scope.projects).toEqual([{id: 1, name: 'AngularJS'},{id: 2, name: 'Rails'}]);
    expect(scope.projects[0].name).toEqual('AngularJS');
    expect(scope.projects[1].name).toEqual('Rails');
  });
});
