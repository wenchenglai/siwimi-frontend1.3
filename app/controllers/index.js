import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['showAlert', 'title', 'message', 'type'],
    showAlert: false,
    message: '',
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
          this.transitionToRoute('register.signup');
        }
    }
});
