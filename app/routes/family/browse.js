import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        search: function () {
            var self = this,
                session = self.get('session');

            var query = {
                longitude: session.get('longitude'),
                latitude: session.get('latitude'),
                distance: self.controller.get('distance'),
                languages: self.controller.get('languages'),
                fromAge: self.controller.get('fromAge'),
                toAge: self.controller.get('toAge')
            };

            self.store.find('family', query).then(function(families) {
                self.set('model', families.content);
                self.controller.set('showData', true);
            }, function(error) {
                self.send('error', error);
            });
        }
    }
});
