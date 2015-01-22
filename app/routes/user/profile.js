import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        var self = this,
            id = self.get('session.user.id'),
            facebookId = self.get('session.user.facebookId');

        if (id) {
            return self.store.find('member', id);
        } else if (facebookId) {
            return self.store.find('member', facebookId);
        } else {

        }
    },

    deactivate: function() {
        var self = this;
        self.get('controller').deactivate();
    }
});
