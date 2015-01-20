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

    afterModel: function(test1, test2) {
        var a = test1;
        var b = test2;
        a.toString();
        b.toString();
    }
});
