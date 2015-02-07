import Ember from 'ember';

export default Ember.Route.extend({
    statusFilter: 'popular',
    typeFilter: 'deal',

    model: function () {
        var self = this,
            session = self.get('session'),
            userId = self.get('session.id');

        return this.store.find('tip', { requester: userId, status: self.get('statusFilter'), type: self.get('typeFilter'), longitude: session.get('longitude'), latitude: session.get('latitude') });
    },

    actions: {
        loadData: function () {
            this.model();
        },

        setStatusFilter: function(status) {
            this.set('statusFilter', status);
            this.model();
        },

        setTypeFilter: function(type) {
            this.set('typeFilter', type);
            this.model();
        }
    }
});
