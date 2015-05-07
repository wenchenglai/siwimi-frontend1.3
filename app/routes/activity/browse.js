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

            if (self.get('controller.pageSize'))
                pageSize = self.get('controller.pageSize');

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

    reload: function() {
        self.model().then(function(records) {
            var totalRecordCount = 26;
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

        loadNextPage: function (type) {
            var self = this;

            self.incrementProperty('pageNumber');
            self.reload();
        },

        loadPrevPage: function (type) {
            var self = this;

            self.decrementProperty('pageNumber');
            self.reload();
        }
    }
});
