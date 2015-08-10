import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        search: function () {
            var self = this,
                session = self.get('session'),
                userId = self.get('session.secure.id'),
                query = {
                    requester: userId,
                    queryText: self.controller.get('queryText'),
                    distance: self.controller.get('distance'),
                    longitude: session.get('longitude'),
                    latitude: session.get('latitude')
                };

            self.store.query('item', query).then(function(items) {
                self.set('model', items);
                self.controller.set('showData', true);
            });
        }
    }
});
