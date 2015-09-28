import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.findRecord('member', params.id);
  },

  setupController(controller, model) {
    controller.set('model', model);
  },

  actions: {
    deleteMember: function() {
      var controller = this.controller;
        controller.get('model').destroyRecord().then(function() {
        controller.transitionTo('admin.members.index');
      });
    }
  }
});

