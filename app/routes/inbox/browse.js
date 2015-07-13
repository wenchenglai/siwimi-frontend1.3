import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({
    model: function () {
        var self = this,
            userId = self.get('session.id');

        return self.store.query('message', { to: userId, toStatus: 'both', sort: 'desc' });
    },

    actions: {
        refresh: function () {
            this.refresh();
        }
    }
});
