import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        save: function() {
            var self = this;

            self.get('model').save().then(function(family) {
                self.transitionTo('family.show', family);
            });

            return false;
        },

        cancel: function() {
            this.transitionTo('family.show', this.currentModel);
        }
    }
});
