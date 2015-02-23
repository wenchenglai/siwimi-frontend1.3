import Ember from 'ember';

export default Ember.Route.extend({
    afterModel: function(model, transition) {
        if (model.get('isDirty')) {
            model.rollback();
        }
    },

    actions: {
        save: function() {
            var self = this,
                model = self.currentModel;

            model.save().then(function(obj) {
                self.transitionTo('questions.show', obj);
            });

        },

        cancel: function() {
            this.transitionTo('questions.show', this.currentModel);
        }
    }
});
