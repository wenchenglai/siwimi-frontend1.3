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
                    distance: self.controller.get('distance'),
                    period: self.controller.get('period'),
                    fromTime: self.controller.get('fromTime') ? self.controller.get('fromTime').toDate(): "",
                    toTime: self.controller.get('toTime') ? self.controller.get('toTime').toDate(): "",
                    longitude: appController.get('baseLongitude'),
                    latitude: appController.get('baseLatitude')
                };

            self.store.find('activity', query).then(function(records) {
                self.controller.set('model', records.get('content'));
                self.controller.set('showData', true);
            }, function(error) {
                self.send('error', error);
            });
        }
    }
});
