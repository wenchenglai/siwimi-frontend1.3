import Ember from 'ember';
import SessionSetupMixin from '../mixins/session-setup';

export default Ember.Route.extend(SessionSetupMixin, {
    showError: false,
    errorMessage: '',

    actions: {
        error: function(error, transition) {
            debugger;
            if (error && error.status === 400) {
                // error substate and parent routes do not handle this error
                return this.transitionTo('modelNotFound');
            }
            return true;
        },

        authenticateWithFacebook: function () {
            var self = this,
                session = self.get('session');

            session.authenticate('authenticator:facebook', {}).then(function () {
                self._setLongitudeAndLatitudeInSession(session, session.get('user'));
                self._setProfilePictureInSession(session, session.get('user'));
            }, function (error) {
                self.get('controller').set('errorMessage', 'Facebook Login Error:' + error);
                self.get('controller').set('showError', true);
            });
        },

        // This action is fired when user click on Login button on Login page
        authenticateCustom: function () {
            var self = this,
                session = self.get('session'),
                controller = self.get('controller'),
                email = controller.get('email'),
                password = controller.get('password'),
                host = self.store.adapterFor('application').get('host');

            session.authenticate('authenticator:custom', {email: email, password: password, host: host}).then(function () {
                self._setLongitudeAndLatitudeInSession(session, session.get('user'));
                self._setProfilePictureInSession(session, session.get('user'));
            }, function (error) {
                self.get('controller').set('errorMessage', 'Login Error:' + error);
                self.get('controller').set('showError', true);
            });        
        }
    }
});
