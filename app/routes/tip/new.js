import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        var self = this;
        return self.store.createRecord('tip');
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
