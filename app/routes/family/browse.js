import Ember from 'ember';

export default Ember.Route.extend({
    setupController: function(controller, model) {
        controller.set('model', model);
        controller.set('showData', false);
    },

    actions: {
        search: function () {
            var self = this;

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

            self.store.query('family', query).then(function(families) {
                self.set('families', families);
                self.controller.set('showData', true);
            }, function(error) {
                self.send('error', error);
            });
        }
    }
});
