import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function() {
        var self = this,
            session = self.get('session');
        return self.store.createRecord('tip', { city: session.get('baseCity'), state: session.get('baseState'), zipCode: session.get('zipCode')});
    }
    //actions: {
    //    add: function () {
    //        var self = this,
    //            model = self.currentModel;

    //        model.save().then(function() {
    //            self.transitionTo('tip.my');
    //        });
    //    }
    //}
});
