import Ember from 'ember';

export default Ember.Route.extend({
    statusFilter: 'all',
    typeFilter: 'all',
    pageNumber: 1,
    
    model: function () {
        var self = this,
            session = self.get('session'),
            userId = self.get('session.id'),
            pageSize = 5;

        if (self.get('controller.pageSize'))
            pageSize = self.get('controller.pageSize');

        return this.store.find('tip', { 
            requester: userId, 
            status: self.get('statusFilter'), 
            type: self.get('typeFilter'), 
            longitude: session.get('longitude'), 
            latitude: session.get('latitude'),
            per_page: pageSize,
            page: self.get('pageNumber')
        });
    },

    actions: {
        loadData: function () {
            this.model();
        },

        setStatusFilter: function(status) {
            var self = this;

            self.set('statusFilter', status);
            self.model().then(function(myModel) {
                self.get('controller').set('model', myModel);
            });
        },

        loadByType: function(type) {
            var self = this;

            self.set('typeFilter', type);
            self.model().then(function(myModel) {
                self.get('controller').set('model', myModel);
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
