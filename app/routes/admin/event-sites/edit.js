import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model(params) {
        return this.store.findRecord('activitySite', params.id);
    },

    actions: {
        update(eventSite) {
            eventSite.save().then(() => {
                this.transitionTo('admin.eventSites');
            });
        }
    }
});
