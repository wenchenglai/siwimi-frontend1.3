import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.createRecord('feedback');
  },

  actions: {
    send: function() {
      var self = this;
      var model = self.get('controller.model');

      model.save();
    }
  }
});
