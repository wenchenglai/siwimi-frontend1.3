import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
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

        return this.store.query('tip', Ember.merge(params, {
            requester: userId,
            creator: userId,
            longitude: appController.get('baseLongitude'),
            latitude: appController.get('baseLatitude')
        }));
    },

    setupController: function (controller, model) {
        // we get the total item count so we can generate the right pagination.
        controller.set('model', model);
        controller.set('keepPageNumber', false);
        if (model.get('length') > 0) {
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
    },

    actions: {
        delete: function (id) {
            this.store.find('tip', id).then(function (record) {
                record.destroyRecord();
            });
        }
    }
});
