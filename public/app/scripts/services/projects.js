app.factory('Project', function($resource){
  var Project = $resource('/projects/:id', null, { update: { method: 'POST' }});

  Project.prototype.update = function(cb) {
    this._method = 'PUT';
    return Project.update({ id: this.id }, this, cb);
  };  

  return Project;
});