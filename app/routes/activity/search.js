import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        search: function () {
            var self = this,
                session = self.get('session'),
                userId = self.get('session.id'),
                query = {
                    requester: userId,
                    queryText: self.controller.get('queryText'),
                    distance: self.controller.get('distance'),
                    period: self.controller.get('period'),
                    fromTime: self.controller.get('fromTime') ? self.controller.get('fromTime').toDate(): "",
                    toTime: self.controller.get('toTime') ? self.controller.get('toTime').toDate(): "",
                    longitude: session.get('longitude'),
                    latitude: session.get('latitude')
                };

            self.store.find('activity', query).then(function(events) {
                self.controller.set('model', events.get('content'));
                self.controller.set('showData', true);
            }, function(error) {
                self.send('error', error);
            });
        }
    }
});
