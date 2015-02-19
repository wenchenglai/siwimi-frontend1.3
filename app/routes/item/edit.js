import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    afterModel: function(model, transition) {
        if (model.get('isDirty')) {
            model.rollback();
        }
    },

    actions: {
        save: function() {
            var self = this,
                model = self.currentModel;

            model.save().then(function(item) {
                self.transitionTo('item.show', item);
            });

        },

        cancel: function() {
            this.transitionTo('item.my');
        }
    }
});
