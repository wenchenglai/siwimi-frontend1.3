import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
    return this.store.find('question', params.id);
  },

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
                self.transitionTo('questions.show', obj.id);
            });

        },

        cancel: function() {
            this.transitionTo('questions.my', this.currentModel);
        }
    }
});
