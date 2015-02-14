import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({
    model: function () {
        var self = this,
            session = self.get('session'),
            user = session.get('user');

        return self.store.find('message', { to: user.id, toStatus: 'both' });
    },

    actions: {
        refresh: function () {
            this.refresh();
        }
    }
});
