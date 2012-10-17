app.factory('Project', function($resource){
  var Project = $resource('/projects/:id', null, { update: { method: 'PUT' }});

  Project.prototype.update = function(cb) {
    return Project.update({ id: this.id }, this, cb);
  };
  
  Project.prototype.destroy = function(cb) {
    return Project.remove({id: this.id}, cb);
  };

  return Project;
});