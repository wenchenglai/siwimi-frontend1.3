import Ember from 'ember';

export default Ember.Route.extend({
    afterModel: function(model, transition) {
        if (model.get('isDirty')) {
            model.rollback();
        }
    },
    actions: {
        cancel: function() {
            this.transitionTo('family.my');
        },
        save: function() {
            var self = this,
                model = self.currentModel;


            var onSuccess = function(ret) {
                self.transitionTo('family.my');
            };

            var onFail = function(error) {
                throw new error('Saving New Member Error');
            };

            model.save().then(onSuccess, onFail);

        }
    }
});
