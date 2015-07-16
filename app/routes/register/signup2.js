import Ember from 'ember';

export default Ember.Route.extend({
    resetValues: function () {
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
                session = self.get('session'),
                host = self.store.adapterFor('application').get('host'),
                model = self.currentModel;

            model.set('isInSignUpProcess', false);

            var onSuccess = function (member) {
                // right now, I have no better solution but to login again, recommmended by a stackoverflow post
                // http://stackoverflow.com/questions/22774111/login-after-successful-signup-ember-simple-auth
                // login successfully

                session.authenticate('authenticator:custom', {
                    email: member.get('email'), password: member.get('password'), host: host
                }).then(function () {
                    //self._setLongitudeAndLatitudeInSession(session, session.get('user'));
                    //self._setProfilePictureInSession(session, session.get('user'));

                }, function (error) {
                    self.send('error', {name: 'Login Error', message: "Failed to login after sign up" + error.toString()});
                });
            };

            var onFail = function (error) {
                throw new Error('Saving New Member Error');
            };

            model.save().then(onSuccess, onFail);
        }
    }
});
