import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function() {
        return this.store.findAll('activitySite', { reload: true });
    },

    actions: {
        toggleActive(site) {
            site.toggleProperty('isActive');
            site.save().then(() => {
                // do nothing
            }, (error) => {
                self.send('error', error);
            });
        }
    }
});
