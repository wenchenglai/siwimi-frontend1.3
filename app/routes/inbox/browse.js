import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({
    model: function () {
        var self = this,
            userId = self.session.get('session.id');

        return self.store.find('message', { to: userId, toStatus: 'both' });
    },

    actions: {
        refresh: function () {
            this.refresh();
        }
    }
});
