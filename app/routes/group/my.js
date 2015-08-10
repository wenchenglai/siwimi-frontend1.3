import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function () {
        var self = this,
            userId = self.get('session.secure.id');

        return self.store.query('group', {creator: userId});
    },

    actions: {
        delete: function (id) {
            this.store.find('group', id).then(function (record) {
                record.destroyRecord();
            });
        }
    }
});
