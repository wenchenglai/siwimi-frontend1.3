import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function() {
        var self = this,
            id = self.get('session.secure.id');

            return self.store.findRecord('member', id);
    },

    afterModel: function(model) {
        var self = this,
            appController = self.controllerFor('application');

        if (Ember.isEmpty(model.get('city')) || Ember.isEmpty(model.get('state'))) {
            model.set('city', appController.get('baseCity'));
            model.set('state', appController.get('baseState'));
        }
    },

    actions: {
        importFromFacebook: function () {
            var self = this,
                fromModel = self.currentModel;

            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    FB.api('/me?fields=id,email', function (fbUser) {
                        if (fbUser.error) {
                            self.send('error', {name: fbUser.error.type, message: fbUser.error.message})
                        } else {
                            if (!fromModel.get('email')) {
                                fromModel.set('email', fbUser.email);
                            }

                            if (!fromModel.get('facebookId')) {
                                fromModel.set('facebookId', fbUser.id);
                            }
                        }
                    });
                } else {
                    var session = self.get('session');

                    session.authenticate('authenticator:facebook', {}).then(function () {

                    }, function (error) {
                        self.send('error', error);
                    });
                }
            });
        }
    }
});
