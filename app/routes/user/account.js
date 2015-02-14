import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function() {
        var self = this,
            id = self.get('session.id');

            return self.store.find('member', id);
    }

    //deactivate: function() {
    //    var self = this;
    //    self.get('controller').deactivate();
    //}
});
