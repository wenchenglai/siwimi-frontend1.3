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

            self.store.find('item', query).then(function(items) {
                self.set('model', items.get('content'));
                self.controller.set('showData', true);
            });
        }
    }
});
