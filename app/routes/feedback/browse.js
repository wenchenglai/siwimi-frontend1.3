import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        var self = this;
        return self.store.find('feedback');
    }
});
