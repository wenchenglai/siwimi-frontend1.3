import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        var self = this;

        return self.store.createRecord('activity');
    },

    actions: {
        goBack: function() {
            var self = this,
                previousURL = self.controllerFor('application').get('previousURL');

            if (!Ember.isEmpty(previousURL) && previousURL.indexOf("/activity/my") > -1) {
                history.back();
            } else {
                self.transitionTo('activity.browse');
            }
        },

        submit: function () {
            var self = this,
                userId = self.get('session.secure.id'),
                model = self.currentModel;

            self.controller.set('isDisabled', true);

            model.set('isDeletedRecord', false);
            model.set('createdDate', new Date());
            model.set('stage', "Submitted")
            model.set('errorCode', 7); // 7 means missing title + missing date

            var onSuccess = function (obj) {
                self.controller.set('isDisabled', false);
                self.send('showAlertBar', {
                    title: 'Success',
                    message: "Thank you!  We'll add this event to our system soon.",
                    type: 'alert-success'
                });
            };

            var onFail = function (error) {
                self.send('error', error);
                self.controller.set('isDisabled', false);
            };

            if (userId) {
                self.store.findRecord('member', userId).then(function(user) {
                    model.set('creator', user);
                    model.save().then(onSuccess, onFail);
                });
            } else {
                model.save().then(onSuccess, onFail);
            }
        }
    }
});
