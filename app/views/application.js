import Ember from 'ember';

export default Ember.View.extend({
  getLocations: function(request, response) {
    var self = this;

    self.store.find('location', {queryText: request.term}).then(function(locations) {
      self.set('locations', locations);
      response(locations);
    });
  }.property()
});
