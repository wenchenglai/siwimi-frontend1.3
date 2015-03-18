import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        goBack: function() {
            var self = this,
                session = self.get('session');

            if (session.isAuthenticated) {
                self.transitionTo('item.my');
            } else {
                self.transitionTo('item.browse');
            }
        }
    }
});
