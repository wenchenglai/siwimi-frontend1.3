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
            session = self.get('session'),
            userId = self.get('session.id'),
            pageSize = 10;

            if (self.get('controller.pageSize')) {
                pageSize = self.get('controller.pageSize');
            }

            return self.store.find('activity', Ember.merge(params, {
                //status: self.get('currentStatus'),
                //type: self.get('currentType'),
                requester: userId,
                longitude: appController.get('baseLongitude'),
                latitude: appController.get('baseLatitude'),
                //per_page: pageSize,
                //page: self.get('pageNumber')
            }));
    },

    setupController: function(controller, model) {
        // we get the total item count so we can generate the right pagination.
        controller.set('model', model);
        if (model.get('length') > 0) {
            var totalRecordCount = model.get('content')[0].get('queryCount');
            if (totalRecordCount != controller.get('queryCount')) {
                controller.set('queryCount', totalRecordCount);
            }
        }
    },

    _reload: function() {
        var self = this;
        self.model().then(function(records) {
            var recordArray = records.get('content'),
                totalRecordCount = 0;

            if (recordArray.get('length') > 0) {
                totalRecordCount = recordArray[0].get('queryCount');

                Ember.$('.pagination li').each(function(key, value){
                    Ember.$(this).removeClass('active');
                });
                Ember.$('.pagination li:nth-child(' + (self.get('pageNumber') + 1) + ')').addClass("active");
            }

            self.controller.set('queryCount', totalRecordCount);

            self.controller.set('content', records);
        });
    },

    actions: {
        loadByStatus: function (status) {
            var self = this;

            self.set('status', status);
            self._reload();
        },

        loadByType: function (type) {
            var self = this;

            self.set('type', type);
            self._reload();
        },

        loadByPageNumber: function (pageNumber) {
            var self = this;

            if (pageNumber !== self.get('controller.pageNumber')) {
                self.set('pageNumber', pageNumber);
                self._reload();
            }
        },

        loadOnPageSizeChange: function (newSize) {
            var self = this;

            //
            if (newSize) {
                if (newSize !== self.get('controller.pageSize')) {
                    self.get('controller').set('pageSize', newSize);
                }
            }
            self._reload();
        },

        loadNextPage: function () {
            var self = this;

            self.incrementProperty('controller.pageNumber');
            self.model().then(function(records) {
                //var data = self.controller.get('content');
                //data.addObject(records);
                self.controller.set('content', records);
            });
        },

        loadPrevPage: function () {
            var self = this;

            self.decrementProperty('controller.pageNumber');
            self.model().then(function(records) {
                //var data = self.controller.get('content');
                //data.addObject(records);
                self.controller.set('content', records);
            });
        }
    }
});
