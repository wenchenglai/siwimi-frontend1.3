import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    actions: {
        save: function() {
            var self = this;

            self.currentModel.save().then(function(family) {
                self.transitionTo('family.show', family);
            });
        },

        cancel: function() {
            this.transitionTo('family.show', this.currentModel);
        }
    }
});
