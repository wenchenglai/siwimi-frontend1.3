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
            var self = this,
                previousURL = self.controllerFor('application').get('previousURL');

            if (!Ember.isEmpty(previousURL) && previousURL.indexOf("/activity/my") > -1) {
                history.back();
            } else {
                self.transitionTo('activity.my');
            }

        },

        save: function() {
            var self = this,
                model = self.currentModel,
                userId = self.get('session.secure.id');

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
            this.transitionTo('activity.my');
        }
    }
});
