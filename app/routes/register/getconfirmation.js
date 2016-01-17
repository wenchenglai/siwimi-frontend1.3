import Ember from 'ember';
import ENV from '../../config/environment';

export default Ember.Route.extend({
    actions: {
        resend: function(id) {
            var self = this,
                host = ENV.apiHost;

            $.getJSON(host + "/email/sendConfirmation?id=" + id);

            self.transitionTo('index', {queryParams: {
                showAlert: true,
                title: 'Sign Up',
                message: "We've resent the confirmation email to your inbox.  You might need to check your junk mail inbox.",
                type: 'alert-info'
            }});
        }
    }
});
