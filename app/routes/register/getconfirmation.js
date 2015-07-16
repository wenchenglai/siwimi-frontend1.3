import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        resend: function(id) {
            Ember.$.ajax({
                url: 'email/sendConfirmation?id=' + id,
                type: 'GET'
            });
        }
    }
});
