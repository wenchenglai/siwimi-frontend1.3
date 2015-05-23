import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        getLocation: function(autocomplete, term) {
            var self = this;

            self.store.find('location', {queryText: term}).then(function(locations) {
                self.set('locations', locations);
            });
        },

        login: function() {
          this.transitionTo('login');
        },

        signup: function() {
          this.transitionTo('signup');
        }
    }
});
