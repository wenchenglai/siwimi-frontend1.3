import Ember from 'ember';
import SessionSetupMixin from '../../mixins/session-setup';
import Validators from '../../mixins/validate-utility';

export default Ember.Route.extend(SessionSetupMixin, Validators, {
    resetValues: function() {
        var controller = this.get('controller');
        controller.set('email', '');
        controller.set('firstName', '');
        controller.set('lastName', '');
        controller.set('password', '');
        controller.set('password2', '');
    },

    actions: {
        signUp: function () {
            var self = this,
                controller = self.get('controller'),
                email = controller.get('email'),
                //userName = controller.get('userName'),
                firstName = controller.get('firstName'),
                lastName = controller.get('lastName'),
                password = controller.get('password'),
                password2 = controller.get('password2'),
                appController = self.controllerFor('application');

            if (Ember.isEmpty(email) || Ember.isEmpty(firstName) || Ember.isEmpty(lastName)) {
                self.send('error', { name: 'Data Error', message: "Email and User Name cannot be empty." });
                return;
            }

            if (self.validateEmail(email)) {
                if (password === password2 && password != null) {
                    var newMember = self.store.createRecord('member', {
                        email: email,
                        //nickName: userName,
                        lastName : lastName,
                        firstName : firstName,
                        password: password,
                        isUser: true,
                        isInSignUpProcess: true,
                        isConfirmedMember: false,
                        city: appController.get('baseCity'),
                        state: appController.get('baseState')
                    });

                    newMember.save().then(function(member) {
                        // new user account created successfully
                        var session = self.get('session'),
                            host = self.store.adapterFor('application').get('host');

                        self.resetValues();

                        self.send('showAlertBar', {
                            title: 'Sign Up',
                            message: 'Thanks for signing up.  Please check your email for confirmation',
                            type : 'alert-info'});

/*                        session.authenticate('authenticator:custom', {
                            email: member.get('email'), password: member.get('password'), host: host
                        }).then(function () {

                            // right now, I have no better solution but to login again, recommmended by a stackoverflow post
                            // http://stackoverflow.com/questions/22774111/login-after-successful-signup-ember-simple-auth
                            // login successfully
                            //self._setLongitudeAndLatitudeInSession(session, session.get('user'));
                            //self._setProfilePictureInSession(session, session.get('user'));

                        }, function (error) {
                            self.send('error', { name: 'Login Error', message: "Failed to login" + error.toString() });
                        });*/
                    }, function(error) {
                        self.send('error', error);
                    });
                } else {
                    self.send('error', { name: 'Data Error', message: "Passwords don't match." });
                }
            } else {
                self.send('error', { name: 'Data Error', message: "Email is not in the right format"})
            }
        },
    }
});
