import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        goBack: function() {
            var self = this,
                session = self.get('session');

            if (session.isAuthenticated) {
                self.transitionTo('activity.my');
            } else {
                self.transitionTo('activity.browse');
            }
        },

        colorChanged: function(selectedValue) {
            var ddd = 3;
            var aaa = 4;
            var eee = ddd + aaa;
        }
    }
});
