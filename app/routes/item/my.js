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
        condition: {
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
            userId = self.get('session.id');

        return self.store.find('item',
            Ember.merge(params, {
            creator: userId,
            requester: userId,
            longitude: appController.get('baseLongitude'),
            latitude: appController.get('baseLatitude')
            }));
    },

    setupController: function(controller, model) {
        // we get the total item count so we can generate the right pagination.
        controller.set('model', model);
        controller.set('keepPageNumber', false);
        if (model.get('length') > 0) {
            var totalRecordCount = model.get('content')[0].get('queryCount');
            if (totalRecordCount != controller.get('queryCount')) {
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
        loadByStatus: function (status) {
            var self = this;

            self.set('currentStatus', status);
            self.model(status, self.get('currentType'), self.get('currentCondition')).then(function(records) {
                self.get('controller').set('content', records);
            });
        },

        loadByCondition: function (condition) {
            var self = this;

            self.set('currentCondition', condition);
            self.model(self.get('currentStatus'), self.get('currentType'), condition).then(function(records) {
                self.get('controller').set('content', records);
            });
        },

        loadByType: function (type) {
            var self = this;

            self.set('currentType', type);
            self.model(self.get('currentStatus'), type, self.get('currentCondition')).then(function(records) {
                self.get('controller').set('content', records);
            });
        },

        delete: function (id) {
            this.store.find('item', id).then(function (record) {
                record.destroyRecord();
            });
        }
    }
});
