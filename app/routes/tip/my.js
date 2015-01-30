import Ember from 'ember';

export default Ember.Route.extend({
    model: function (status) {
        var self = this,
            session = self.get('session'),
            user = session.get('user');

        if (typeof(status) !== "string") {
            status = 'all';
        }

        return self.store.find('tip', { status: status, creator: user.id, longitude: session.get('longitude'), latitude: session.get('latitude') });
    },

    actions: {
        loadData: function (status) {
            var self = this;

            self.model(status).then(function(records) {
                self.get('controller').set('content', records);
            });
        },

        delete: function (id) {
            this.store.find('tip', id).then(function (record) {
                record.destroyRecord();
                //record.deleteRecord();
                //record.save();
            });
        }
    }
});
