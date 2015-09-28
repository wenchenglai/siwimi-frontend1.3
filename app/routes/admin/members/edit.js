import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
       return this.store.findRecord('member', params.id);
  },

  actions: {
    updateMember(member) {
      member.save().then(() => {
        this.transitionTo('admin.members');
      });
    }
  }
});
