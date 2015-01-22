import Ember from 'ember';

export default Ember.Route.extend({
    showError: false,
    errorMessage: '',

    _setLongitudeAndLatitude: function (session, member) {
        var family = member.get('family'),
            longitude = 0.0,
            latitude = 0.0;

        if (family) {
            if (family.get('location')) {
                longitude = family.get('location')[0];
                latitude = family.get('location')[1];
            }
        } else if (member.get('location')) {
            longitude = member.get('location')[0];
            latitude = member.get('location')[1];
        }

        if (longitude === 0.0) {
            longitude = geoplugin_longitude();
        }

        if (latitude === 0.0) {
            latitude = geoplugin_latitude();
        }

        session.set('longitude', longitude);
        session.set('latitude', latitude);
    },

    _setProfilePicture: function (session, member) {
        var pic = member.get('largePicture');

        if (pic) {
            session.set('profilePicture', pic);
        } else {
            session.set('profilePicture', '/assets/images/avatar.jpg');
        }
    },

    actions: {
        authenticateWithFacebook: function () {
            var self = this,
                session = self.get('session');

            session.authenticate('authenticator:facebook', {}).then(function () {              
                self._setLongitudeAndLatitude(session, session.get('user'));
                self._setProfilePicture(session, session.get('user'));
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
                self._setLongitudeAndLatitude(session, session.get('user'));
                self._setProfilePicture(session, session.get('user'));
            }, function (error) {
                self.get('controller').set('errorMessage', 'Login Error:' + error);
                self.get('controller').set('showError', true);
            });        
        }
    }
});
