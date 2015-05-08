import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        var self = this,
            session = self.get('session');

        return self.store.createRecord('activity', { city: session.get('baseCity'), state: session.get('baseState'), zipCode: session.get('zipCode')});
    },

    actions: {
        cancel: function () {
            this.transitionTo('activity.my');
        },
        save: function () {
            var self = this,
                model = self.currentModel,
                userId = self.get('session.id');

            self.controller.set('isDisabled', true);
            self.store.find('member', userId).then(function(user) {
                model.set('creator', user);
                model.set('isDestroyed', false);
                model.set('createdDate', new Date());

                var onSuccess = function (obj) {
                    self.controller.set('isDisabled', false);
                    self.transitionTo('activity.show', obj);
                };

                var onFail = function (error) {
                    self.send('error', error);
                    self.controller.set('isDisabled', false);
                };

                model.save().then(onSuccess, onFail);
            }, function(error) {
                self.send('error', error);
                self.controller.set('isDisabled', false);
            });
        }
    }
});
