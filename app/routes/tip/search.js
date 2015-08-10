import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        search: function () {
            var self = this,
                appController = self.controllerFor('application'),
                userId = self.get('session.secure.id'),
                query = {
                    requester: userId,
                    queryText: self.controller.get('queryText'),
                    longitude: appController.get('baseLongitude'),
                    latitude: appController.get('baseLatitude')
                };

            self.store.query('tip', query).then(function(records) {
                self.controller.set('model', records);
                self.controller.set('showData', true);
            }, function(error) {
                self.send('error', error);
            });
        }
    }
});
