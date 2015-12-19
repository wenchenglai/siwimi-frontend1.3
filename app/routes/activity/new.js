import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        var self = this,
            city = self.get('session.secure.user.city'),
            state = self.get('session.secure.user.state'),
            zipCode = self.get('session.secure.user.zipCode');

        return self.store.createRecord('activity', {
            city: city,
            state: state,
            zipCode: zipCode
        });
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

        cancel: function () {
            this.transitionTo('activity.my');
        },

        save: function () {
            var self = this,
                model = self.currentModel,
                userId = self.get('session.secure.id');

            self.controller.set('isDisabled', true);
            self.store.findRecord('member', userId).then(function(user) {
                model.set('creator', user);
                model.set('isDeletedRecord', false);
                model.set('createdDate', new Date());

                if (Ember.isEmpty(model.get('city'))) {
                    model.set('city', user.get('city'));
                }

                if (Ember.isEmpty(model.get('state'))) {
                    model.set('state', user.get('state'));
                }

                if (Ember.isEmpty(model.get('zipCode'))) {
                    model.set('zipCode', user.get('zipCode'));
                }

                var onSuccess = function (obj) {
                    self.controller.set('isDisabled', false);
                    self.transitionTo('activity.show', obj.id);
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
