import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        return this.store.find('group', params.id);
    },

    actions: {
        goBack: function() {
            var self = this,
                session = self.get('session'),
                previousURL = self.controllerFor('application').get('previousURL');

            if (previousURL) {
                self.transitionTo(previousURL);
            } else {
                self.transitionTo('group.my');
            }
        }
    }
});
