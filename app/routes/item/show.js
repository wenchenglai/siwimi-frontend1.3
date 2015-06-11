import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        return this.store.find('item', params.id);
    },

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
