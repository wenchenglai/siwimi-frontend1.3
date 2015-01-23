import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        var self = this,
            session = self.get('session'),
            user = session.get('user');

        return self.store.find('message', { to: user.id, toStatus: 'both' });
    },

    actions: {
        delete: function (id) {
            this.store.find('tip', id).then(function (record) {
                record.destroyRecord();
            });
        }
    }
});
