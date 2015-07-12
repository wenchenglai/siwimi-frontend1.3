import Ember from 'ember';
import SessionSetupMixin from '../mixins/session-setup';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(SessionSetupMixin, UnauthenticatedRouteMixin, {
    actions: {
        authenticateWithFacebook: function () {
            var self = this,
                session = self.get('session');

            session.authenticate('authenticator:facebook', {}).then(function () {
                //self._setLongitudeAndLatitudeInSession(session, session.get('user'));
                //self._setProfilePictureInSession(session, session.get('user'));
            }, function (error) {
                self.send('error', error);
            });
        },

        authenticateCustom: function () {
            var self = this,
                session = self.get('session'),
                email = self.get('controller.email'),
                password = self.get('controller.password'),
                host = self.store.adapterFor('application').get('host');

            session.authenticate('authenticator:custom', {email: email, password: password, host: host}).then(function () {
                //self._setLongitudeAndLatitudeInSession(session, session.get('user'));
                //self._setProfilePictureInSession(session, session.get('user'));


                var member = session.get('user');
                // if user has not confirmed, we log the user out again
                //if (member.get('isInSignUpProcess')) {
                //    self.transitionTo('signup', member);
                //}

                // we need to check if this user has finished the sign up process
                if (member.get('isInSignUpProcess')) {
                    self.transitionTo('signup2', member);
                }

            }, function (error) {
                self.send('error', error);
            });        
        }
    }
});
