import Ember from 'ember';

export default Ember.Route.extend({
    modelType: 'question',
    model: function (status) {
        var self = this,
            session = self.get('session'),
            userId = self.get('session.id');

        if (typeof(status) !== "string") {
            status = 'open';
        }

        return self.store.find(self.get('modelType'), { status: status, creator: userId, requester: userId, longitude: session.get('longitude'), latitude: session.get('latitude') });
    },

    actions: {
        loadData: function (status) {
            var self = this;

            self.model(status).then(function(records) {
                self.get('controller').set('content', records);
            });
        },

        loadIsAnswered: function () {
            var self = this;

            self.model(status).then(function(records) {
                self.get('controller').set('content', records);
            });
        },

        delete: function (id) {
            this.store.find(this.get('modelType'), id).then(function (record) {
                record.destroyRecord();
            });
        }
    }
});
