import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        status: {
            refreshModel: true
        },
        type: {
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

            return self.store.query('activity', Ember.merge(params, {
                requester: userId,
                longitude: appController.get('baseLongitude'),
                latitude: appController.get('baseLatitude')
            }));
    },

    setupController: function(controller, model) {
        controller.set('model', model);

        // we get the total item count so we can generate the right pagination.
        if (model.get('length') > 0) {
            // back end will populate field 'queryCount' on the first object so we know how many items in total for this particular query
            // We need the total in order to make the pagination right.
            var totalRecordCount = model.get('firstObject').get('queryCount');
            if (totalRecordCount !== controller.get('queryCount')) {
                controller.set('queryCount', totalRecordCount);
            }
        }
    },

    resetController: function (controller, isExiting, transition) {
        if (isExiting) {
            // isExiting would be false if only the route's model was changing
            controller.set('pageNumber', 1);
        }
    }
});
