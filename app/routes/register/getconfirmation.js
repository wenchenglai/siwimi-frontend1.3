import Ember from 'ember';
import ENV from '../../config/environment';

export default Ember.Route.extend({
    actions: {
        resend: function(id) {
            var host = ENV.apiHost;

            $.getJSON(host + "/email/sendConfirmation?id=" + id);
            //Ember.$.ajax({
            //    url: 'email/sendConfirmation?id=' + id,
            //    type: 'GET'
            //});
        }
    }
});
