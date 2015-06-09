import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        var self = this;
        return self.store.find('feedback');
    },

    actions: {
        delete: function (id) {
            this.store.find('feedback', id).then(function (record) {
                record.destroyRecord();
            });
        }
    }
});
