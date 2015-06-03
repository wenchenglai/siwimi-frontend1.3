import Ember from 'ember';

export default Ember.View.extend({
    isActive: function(request, response) {
        var self = this;
        debugger;
        var a = self.get('controller.currentPath');

    }.property('currentPath')
});
