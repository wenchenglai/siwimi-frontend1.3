import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        search: function () {
            var self = this,
                appController = self.controllerFor('application'),
                userId = self.get('session.id'),
                query = {
                    requester: userId,
                    queryText: self.controller.get('queryText'),
                    longitude: appController.get('baseLongitude'),
                    latitude: appController.get('baseLatitude')
                };

            self.store.find('tip', query).then(function(records) {
                self.controller.set('model', records.get('content'));
                self.controller.set('showData', true);
            }, function(error) {
                self.send('error', error);
            });
        }
    }
});
