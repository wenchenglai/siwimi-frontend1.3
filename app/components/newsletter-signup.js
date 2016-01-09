import Ember from 'ember';

export default Ember.Component.extend({
    email: "",

    actions: {
        closeAlert: function () {
            this.sendAction('closeAlert');
        },

        signUp: function() {
            this.sendAction('signUp', this.get('email'));
        }
    }
});
