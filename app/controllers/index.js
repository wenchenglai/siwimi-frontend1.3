import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        getLocation: function(autocomplete, term) {
            var self = this;

            self.store.query('location', {queryText: term}).then(function(locations) {
                self.set('locations', locations);
            });
        },

        login: function() {
          this.transitionToRoute('login');
        },

        signup: function() {
          this.transitionToRoute('signup');
        }
    }
});
