import Ember from 'ember';

export default Ember.Route.extend({
    currentStatus: "all",
    currentType: "all",
    currentCondition: "all",
    pageNumber: 1,

    model: function (status, type, condition) {
        var self = this,
            session = self.get('session'),
            userId = self.get('session.id'),
            pageSize = 5;

        if (self.get('controller.pageSize'))
            pageSize = self.get('controller.pageSize');

        if (typeof(status) !== "string") {
            status = 'all';
        }
        
        if (typeof(type) !== "string") {
            type = 'all';
        }   

        if (typeof(condition) !== "string") {
            condition = 'all';
        }   

        return self.store.find('item', {
            status: status,
            type: type,
            condition: condition,
            requester: userId,
            longitude: session.get('longitude'),
            latitude: session.get('latitude'),
            per_page: pageSize,
            page: self.get('pageNumber')
        });
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

        loadNextPage: function (type) {
            var self = this;

            self.incrementProperty('pageNumber');
            self.model().then(function(records) {
                //var data = self.controller.get('content');
                //data.addObject(records);
                self.controller.set('content', records);
            });
        },

        loadPrevPage: function (type) {
            var self = this;

            self.decrementProperty('pageNumber');
            self.model().then(function(records) {
                //var data = self.controller.get('content');
                //data.addObject(records);
                self.controller.set('content', records);
            });
        }
    }
});
