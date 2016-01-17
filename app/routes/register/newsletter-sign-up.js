import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        var self = this,
            appController = self.controllerFor('application');

            appController.incrementProperty('showNewsletterCounter');
    }
});
