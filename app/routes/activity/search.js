import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        goBack: function() {
            var self = this,
                previousURL = self.controllerFor('application').get('previousURL');

            if (!Ember.isEmpty(previousURL) && previousURL.indexOf("/activity/browse") > -1) {
                history.back();
            } else {
                self.transitionTo('activity.browse');
            }

        },

        search: function () {
            var self = this,
                appController = self.controllerFor('application'),
                userId = self.get('session.secure.id'),
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

            self.store.query('activity', query).then(function(records) {
                self.controller.set('model', records);
                self.controller.set('showData', true);
            }, function(error) {
                self.send('error', error);
            });
        }
    }
});
