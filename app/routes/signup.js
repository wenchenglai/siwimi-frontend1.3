import Ember from 'ember';
import SessionSetupMixin from '../mixins/session-setup';

export default Ember.Route.extend(SessionSetupMixin, {
    actions: {
        signup: function () {
            var self = this,
                controller = self.get('controller'),
                email = controller.get('email'),
                password = controller.get('password'),
                password2 = controller.get('password2'),
                appController = self.get('container').lookup('controller:application');;

            if (password === password2 && password != null) {
                var newMember = self.store.createRecord('member', {
                    email: email,
                    password: password,
                    isUser: true,
                    avatarUrl: '/assets/images/avatar.jpg',
                    city: appController.get('baseCity'),
                    state: appController.get('baseState')
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
                        self.send('error', { name: 'Login Error', message: "Failed to login" });
                    });

                }, function(error) {
                    self.send('error', error);
                });
            } else {
                self.send('error', { name: 'Data Error', message: "Passwords don't match." });
            }
        },
    }
});
