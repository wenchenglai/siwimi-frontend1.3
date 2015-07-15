import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function(params) {
    return this.store.find('tip', params.id);
  },

    afterModel: function(model) {
        if (model.get('hasDirtyAttributes')) {
            model.rollback();
        }
    }
});
