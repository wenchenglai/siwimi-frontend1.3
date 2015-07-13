import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function(params) {
    return this.store.findRecord('family', params.id);
  },

    afterModel: function(model, transition) {
        if (model.get('isDirty')) {
            model.rollback();
        }
    },
    actions: {
        save: function() {
            var self = this;

            self.currentModel.save().then(function(family) {
                if (self.controllerFor('application').get('previousURL') === '/family/my') {
                    self.transitionTo('family.my');
                } else {
                    self.transitionTo('family.show', family);
                }
            });
        },

        cancel: function() {
            var self = this;

            self.currentModel.rollback();
            self.transitionTo('family.my');
        }
    }
});
