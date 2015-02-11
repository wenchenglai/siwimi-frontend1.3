import Ember from 'ember';

export default Ember.Route.extend({
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
