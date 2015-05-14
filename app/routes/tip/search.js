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
                    longitude: session.get('longitude'),
                    latitude: session.get('latitude')
                };

            self.store.find('tip', query).then(function(records) {
                self.set('model', records.get('content'));
                self.controller.set('showData', true);
            }, function(error) {
                self.send('error', error);
            });
        }
    }
});
