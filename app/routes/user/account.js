import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function() {
        var self = this,
            id = self.get('session.id');

            return self.store.findRecord('member', id);
    },

    afterModel: function(model) {
        var self = this,
            appController = self.controllerFor('application');

        if (Ember.isEmpty(model.get('city')) || Ember.isEmpty(model.get('state'))) {
            model.set('city', appController.get('baseCity'));
            model.set('state', appController.get('baseState'));
        }
    }
});
