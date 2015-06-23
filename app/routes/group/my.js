import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function () {
        var self = this,
            userId = self.get('session.id');

        return self.store.find('group', {creator: userId});
    },

    actions: {
        delete: function (id) {
            this.store.find('group', id).then(function (record) {
                record.destroyRecord();
            });
        }
    }
});
