import Ember from 'ember';

export default Ember.Route.extend({
    showError: false,
    errorMessage: '',

    _createSessionUser: function (session, member) {
        var data = {
            id: member.get('id'),
            facebookId: member.get('facebookId'),
            firstName: member.get('firstName')
        },
        family = member.get('family');

        if (family) {
            data.familyId = family.id;
            data.longitude = family.get('location')[0];
            data.latitude = family.get('location')[1];
        } else {
            data.latitude = geoplugin_latitude();
            data.longitude = geoplugin_longitude();
        }

        session.get('store').persist(data);
    },

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
                    password: password
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
                        self._createSessionUser(session, member);
                        self.transitionTo("index");

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
