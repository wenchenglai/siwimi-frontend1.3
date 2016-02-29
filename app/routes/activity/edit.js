import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        return this.store.find('activity', params.id);
    },

    afterModel: function(model, transition) {
        if (model.get('hasDirtyAttributes')) {
            model.rollback();
        }
    },

    actions: {
        goBack: function() {
            history.back();
        },

        save: function() {
            var self = this,
                model = self.currentModel,
                userId = self.get('session.secure.id');

            self.store.findRecord('member', userId).then(function(user) {
                model.save().then(function(obj) {
                    //self.transitionTo('activity.show', obj.get('id'));
                    history.back();
                });
            });
        },

        cancel: function() {
            var model = this.currentModel;

            if (model.get('hasDirtyAttributes')) {
                model.rollback();
            }

            history.back();
        }
    }
});
