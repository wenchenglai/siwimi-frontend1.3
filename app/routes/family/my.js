import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        var self = this,
            family = self.get('session.user.family'),
            familyId = self.get('session.user.family.id');

        if (typeof(family) === 'string') {
            return self.store.find('family', family);
        } else if (familyId) {
            return self.store.find('family', familyId);
        }
        return null;
    }
});
