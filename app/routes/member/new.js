import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        var self = this;
        return self.store.createRecord('member');
    }, 
});
