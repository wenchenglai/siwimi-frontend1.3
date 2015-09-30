import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.findRecord('member', params.id);
  },

  actions: {
    deleteMember: function() {
       let self = this,
           model = self.controller.get('model');

           model.destroyRecord().then(() => {
            self.transitionTo('admin.members');
        },function () {
            self.transitionTo('admin.members');
      });
    }
  }
});

