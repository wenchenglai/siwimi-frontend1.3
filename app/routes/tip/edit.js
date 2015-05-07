import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    afterModel: function(model) {
        if (model.get('isDirty')) {
            model.rollback();
        }
    }
});
