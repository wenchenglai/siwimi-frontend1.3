import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    currentStatus: "all",
    currentType: "all",
    currentCondition: "all",

    model: function (status, type, condition) {
        var self = this,
            session = self.get('session'),
            userId = self.get('session.id');

        if (typeof(status) !== "string") {
            status = 'all';
        }
        
        if (typeof(type) !== "string") {
            type = 'all';
        }   

        if (typeof(condition) !== "string") {
            condition = 'all';
        }   

        return self.store.find('item', { status: status, type: type, condition: condition, creator: userId, requester: userId, longitude: session.get('longitude'), latitude: session.get('latitude') });
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
