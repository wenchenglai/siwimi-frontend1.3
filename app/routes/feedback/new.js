import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        var userId = this.get('session.id');

        return Ember.RSVP.hash({
            feedback: this.store.createRecord('feedback'),
            creator: this.store.findRecord('member', userId)
        });
    },

    actions: {
        save: function () {
            var self = this,
                model = self.get('controller.model.feedback'),
                userId = self.get('session.id');

            self.store.findRecord('member', userId).then(function(user) {
                model.set('creator', user);
                model.set('isDeletedRecord', false);
                model.set('createdDate', new Date());
                model.set('parentType', 'feedback');

                var onSuccess = function() {
                    self.send('showAlertBar', {
                        title: 'Success',
                        message: 'Thank you for your feedback!',
                        type: 'alert-success'
                    });
                };

                var onFail = function (error) {
                    self.send('error', error);
                };

                model.save().then(onSuccess, onFail);
            }, function(error) {
                self.send('error', error);
                self.controller.set('isDisabled', false);
            });
        }
    }
});
