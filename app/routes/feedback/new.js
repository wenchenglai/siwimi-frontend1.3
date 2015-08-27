import Ember from 'ember';
import Validators from '../../mixins/validate-utility';

export default Ember.Route.extend(Validators, {
    model: function () {
        var userId = this.get('session.secure.id');

        if (!Ember.isEmpty(userId)) {
            return Ember.RSVP.hash({
                feedback: this.store.createRecord('feedback'),
                creator: this.store.findRecord('member', userId)
            });
        } else {
            return null;
        }
    },

    setupController: function(controller, model) {
        controller.set('model', model);

        if (!Ember.isEmpty(this.get('session.secure.id'))) {
            controller.set('email', model.creator.get('email'));
        }
    },

    actions: {
        save: function () {
            var self = this,
                model = self.get('controller.model.feedback'),
                userId = self.get('session.secure.id'),
                email= self.get('controller.email'),
                description = self.get('controller.description');

            // we need to check if this user is logged in user or anonymous user
            if (Ember.isEmpty(userId)) {
                // This is anonymous user
                if (Ember.isEmpty(email) || Ember.isEmpty(description)) {
                    self.send('error', { name: 'Data Error', message: "Email and description cannot be empty." });
                    return;
                }

                if (self.validateEmail(email)) {

                    var model = self.store.createRecord('feedback', {
                        isDeletedRecord: false,
                        parentType: 'feedback',
                        senderEmail: email,
                        description: description,
                        createdDate: new Date()
                    });

                    var onSuccess = function() {
                        self.controller.set('description', '');

                        self.transitionTo('index', {queryParams: {
                            showAlert: true,
                            title: 'Success',
                            message: 'Thank you for your feedback!',
                            type: 'alert-success'
                        }});
                    };

                    var onFail = function (error) {
                        self.send('error', error);
                    };

                    model.save().then(onSuccess, onFail);
                } else {
                    self.send('error', { name: 'Data Error', message: "Email is not in the right format"})
                }

            } else {
                self.store.findRecord('member', userId).then(function(user) {
                    model.set('creator', user);
                    model.set('isDeletedRecord', false);
                    model.set('createdDate', new Date());
                    model.set('parentType', 'feedback');
                    model.set('description', description);

                    var onSuccess = function() {
                        self.controller.set('description', '');
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
    }
});
