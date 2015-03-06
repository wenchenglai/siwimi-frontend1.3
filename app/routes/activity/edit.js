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
                model = self.currentModel,
                userId = self.get('session.id');

            self.store.find('member', userId).then(function(user) {
                if (Ember.isEmpty(model.get('creator'))) {
                    model.set('creator', user);
                }
                
                model.save().then(function(obj) {
                    self.transitionTo('activity.show', obj);
                });
            });
        },

        cancel: function() {
            this.transitionTo('activity.show', this.currentModel);
        }
    }
});
