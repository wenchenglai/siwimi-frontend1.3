import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        search: function () {
            var self = this,
                session = self.get('session');

            var query = {
                longitude: 97,
                latitude: -41,
                distance: self.controller.get('distance'),
                toys: self.controller.get('toys'),
                needs: self.controller.get('needs'),
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
