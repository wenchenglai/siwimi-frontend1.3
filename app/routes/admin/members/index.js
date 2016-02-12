import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model() {
        return this.store.findAll('member');
    },

    actions: {
        delete: function (id) {
            this.store.findRecord('member', id).then(function (record) {
                record.destroyRecord();
            });
        }
    }
});
