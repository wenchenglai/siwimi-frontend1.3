import Ember from 'ember';

export default Ember.Route.extend({
    currentStatus: "all",
    currentType: "all",
    pageNumber: 1,
	
    model: function () {
        var self = this,
            session = self.get('session'),
            userId = self.get('session.id'),
            pageSize = 5;

            if (self.get('controller.pageSize')) {
                pageSize = self.get('controller.pageSize');
            }

        return self.store.find('activity',
            {
                status: self.get('currentStatus'),
                type: self.get('currentType'),
                requester: userId,
                longitude: session.get('longitude'),
                latitude: session.get('latitude'),
                per_page: pageSize,
                page: self.get('pageNumber')
            });
    },

    setupController: function(controller, model) {
        controller.set('model', model);
        if (model.get('length') > 0) {
            var totalRecordCount = model.get('content')[0].get('queryCount');
            controller.set('queryCount', totalRecordCount);
        }
    },

    reload: function() {
        var self = this;
        self.model().then(function(records) {
            var totalRecordCount = records.get('content')[0].get('queryCount');
            self.controller.set('queryCount', totalRecordCount);
            self.controller.set('content', records);
        });
    },

    actions: {
        loadByStatus: function (status) {
            var self = this;

            self.set('currentStatus', status);
            self.reload();
        },
        
        loadByType: function (type) {
            var self = this;

            self.set('currentType', type);
            self.reload();
        },

        loadNextPage: function () {
            var self = this,
                currentPageCount = self.controller.get('pages').length;

            if (self.get('pageNumber') < currentPageCount) {
                self.incrementProperty('pageNumber');
                self.reload();
            }
        },

        loadPrevPage: function () {
            var self = this;

            if (self.get('pageNumber') > 1 ) {
                self.decrementProperty('pageNumber');
                self.reload();
            }
        },

        loadPage: function (pageNumber) {
            var self = this;

            if (pageNumber !== self.get('pageNumber')) {
                self.set('pageNumber', pageNumber);
                self.reload();
            }
        }
    }
});
