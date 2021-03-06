import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        period: {
            refreshModel: true
        },

        status: {
            refreshModel: true
        },

        type: {
            refreshModel: true
        },

        distance: {
            refreshModel: true
        },

        ageGroup: {
            refreshModel: true
        },

        isFree: {
            refreshModel: true
        },

        queryText: {
            refreshModel: false
        },

        pageSize: {
            refreshModel: true
        },

        pageNumber: {
            refreshModel: true
        }
    },

    model (params) {
        var self = this,
            appController = self.controllerFor('application'),
            userId = self.get('session.secure.id');

            return self.store.query('activity', Ember.merge(params, {
                requester: userId,
                stage: "Approved",
                longitude: appController.get('baseLongitude'),
                latitude: appController.get('baseLatitude')
            }));
    },

    afterModel (model, transition) {
        if (model.get('length') == 0) {
            this.transitionTo({queryParams: {pageNumber: 1}});
        }
    },

    setupController (controller, model) {
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

        this.send('showNewsletterSignUpBar');
    },

    resetController (controller, isExiting, transition) {
        if (isExiting) {
            // isExiting would be false if only the route's model was changing
            controller.set('pageNumber', 1);
        }
    },

    actions: {
        error: function(error, transition) {
            this.send('error', error);
            //debugger;
            //if (error && error.status === 400) {
            //    // error substate and parent routes do not handle this error
            //    return this.transitionTo('modelNotFound');
            //}
            //
            //// Return true to bubble this event to any parent route.
            //return true;
        },

        search: function () {
            var self = this,
                appController = self.controllerFor('application'),
                controller = self.controller,
                userId = self.get('session.secure.id'),
                query = {
                    requester: userId,
                    queryText: controller.get('queryText'),
                    distance: controller.get('distance'),
                    period: controller.get('period'),
                    type: controller.get('type'),
                    ageGroup: controller.get('ageGroup'),
                    isFree: controller.get('isFree'),
                    pageNumber: controller.get('pageNumber'),
                    pageSize: controller.get('pageSize'),
                    longitude: appController.get('baseLongitude'),
                    latitude: appController.get('baseLatitude')
                };

            self.store.query('activity', query).then(function(records) {
                // it's possible that the page number is not 1, and the queryText search return only one page of result,
                // so we automatically set the pageNumber to 1 and reload the page again
                debugger;
                if (records.get('length') == 0 && query['pageNumber'] !== 1) {
                    self.transitionTo({queryParams: {pageNumber: 1}});
                }
                self.controller.set('model', records);
            }, function(error) {
                self.send('error', error);
            });
        }
    }
});
