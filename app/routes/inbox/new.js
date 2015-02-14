import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function () {
        //var self = this,
        //    session = self.get('session'),
        //    user = session.get('user');

        //return self.store.createRecord('message', { from: user, subject: 'testsubject' });
    },
});
