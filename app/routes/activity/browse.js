import Ember from 'ember';

export default Ember.Route.extend({
    currentStatus: "all",
    currentType: "all",
	
    model: function (status, type) {
        var self = this,
            session = self.get('session'),
            userId = self.get('session.id');

        if (typeof(status) !== "string") {
            status = 'all';
        }
        
        if (typeof(type) !== "string") {
            type = 'all';
        }

        return self.store.find('activity', { status: status, type: type, requester: userId, longitude: session.get('longitude'), latitude: session.get('latitude') });
    },

    actions: {
        loadByStatus: function (status) {
            var self = this;

            self.set('currentStatus', status);
            self.model(status, self.get('currentType')).then(function(records) {
                self.controller.set('content', records);
            });
        },
        
        loadByType: function (type) {
            var self = this;

            self.set('currentType', type);
            self.model(self.get('currentStatus'), type).then(function(records) {
                self.controller.set('content', records);
            });        	
        }
    }
});
