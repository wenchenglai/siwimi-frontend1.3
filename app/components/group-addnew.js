import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        invite: function() {
            var self = this;

            self.sendAction("action", self.controller.get('email'))
        }
    }
});
