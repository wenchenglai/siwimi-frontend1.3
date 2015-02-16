import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
    _saveTransition: function (transition) {
        var self = this;
        if (transition.targetName !== 'login') {
            self.controller.set('previousTransition', transition);
            self.controller.set('previousURL', self.get('router.url'));
        }
    },

    actions: {
        error: function(error, transition) {
            var self = this,
                title = error.name,
                message = error.message;

            if (error) {
                Em.run(function(){
                    if (title) {
                        self.controller._toggleAlert(true, title, message, 'alert-danger');
                    } else {
                        self.controller._toggleAlert(true, 'Error', 'ERR_CONNECTION_REFUSED', 'alert-danger');
                    }
                });
                return false;
            }
            return true;
        },

        willTransition: function (transition) {
            var self = this;

            Em.run(function(){
                self.controller._toggleAlert(false);
            });

            self._saveTransition(transition);
        }
    }
});
