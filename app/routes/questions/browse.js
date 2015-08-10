import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        status: {
          refreshModel: true
        },
        pageSize: {
          refreshModel: true
        },
        pageNumber: {
          refreshModel: true
        }
    },

    model: function (params) {
         var self = this,
            appController = self.controllerFor('application'),
            userId = self.get('session.secure.id');

        if (!self.get('controller.keepPageNumber')) {
            params.pageNumber = 1;
        }

        return self.store.query('question', Ember.merge(params, {
            requester: userId,
            longitude: appController.get('baseLongitude'),
            latitude: appController.get('baseLatitude')
        }));
    },
});
