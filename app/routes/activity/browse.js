import Ember from 'ember';

export default Ember.Route.extend({
    currentStatus: "all",
    currentType: "all",
    currentPage: 1,
	
    model: function () {
        var self = this,
            session = self.get('session'),
            userId = self.get('session.id'),
            currentPerPage = 5;

            if (self.get('controller.currentPerPage'))
                currentPerPage = self.get('controller.currentPerPage');

        return self.store.find('activity',
            {
                status: self.get('currentStatus'),
                type: self.get('currentType'),
                requester: userId,
                longitude: session.get('longitude'),
                latitude: session.get('latitude'),
                per_page: currentPerPage,
                page: self.get('currentPage') }
        );
    },

    actions: {
        loadByStatus: function (status) {
            var self = this;

            self.set('currentStatus', status);
            self.model().then(function(records) {
                self.controller.set('content', records);
            });
        },
        
        loadByType: function (type) {
            var self = this;

            self.set('currentType', type);
            self.model().then(function(records) {
                self.controller.set('content', records);
            });        	
        },

        loadNextPage: function (type) {
            var self = this;

            self.incrementProperty('currentPage');
            self.model().then(function(records) {
                //var data = self.controller.get('content');
                //data.addObject(records);
                self.controller.set('content', records);
            });
        },

        loadPrevPage: function (type) {
            var self = this;

            self.decrementProperty('currentPage');
            self.model().then(function(records) {
                //var data = self.controller.get('content');
                //data.addObject(records);
                self.controller.set('content', records);
            });
        }
    }
});
