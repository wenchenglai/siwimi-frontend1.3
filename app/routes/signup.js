import Ember from 'ember';
import SessionSetupMixin from '../mixins/session-setup';

export default Ember.Route.extend(SessionSetupMixin, {
    showError: false,
    errorMessage: '',

    actions: {
        signup: function () {
            var self = this,
                controller = self.get('controller'),
                email = controller.get('email'),
                password = controller.get('password'),
                password2 = controller.get('password2');

            if (password === password2 && password != null) {
                var newMember = self.store.createRecord('member', {
                    email: email,
                    password: password,
                    isUser: true,
                    avatarUrl: '/assets/images/avatar.jpg'
                });

                newMember.save().then(function(member) {
                    // new user account created successfully
                    var session = self.get('session'),
                        host = self.store.adapterFor('application').get('host');

                    session.authenticate('authenticator:custom', {
                        email: member.get('email'), password: member.get('password'), host: host
                    }).then(function () {
                        // right now, I have no better solution but to login again, recommmended by a stackoverflow post
                        // http://stackoverflow.com/questions/22774111/login-after-successful-signup-ember-simple-auth
                        // login successfully
                        self._setLongitudeAndLatitudeInSession(session, session.get('user'));
                        self._setProfilePictureInSession(session, session.get('user'));

                    }, function (error) {
                        self.get('controller').set('errorMessage', 'Login Failed. Error Message: ' + error.toString());
                        self.get('controller').set('showError', true);
                    });

                }, function(error) {
                    self.get('controller').set('errorMessage', "Duplicated email.  Error Message: " + error.toString());
                    self.get('controller').set('showError', true);
                });
            } else {
                self.get('controller').set('errorMessage', "Passwords don't match.");
                self.get('controller').set('showError', true);
            }
        },
    }
});
