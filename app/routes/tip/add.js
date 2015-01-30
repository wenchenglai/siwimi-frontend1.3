import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        var self = this;

        if (!self.currentModel) {
            return self.store.createRecord('tip');
        }
    },
    actions: {
        add: function (status) {
            var self = this,
                model = self.get('model');

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
