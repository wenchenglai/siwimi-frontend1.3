import Ember from 'ember';
import Validators from '../mixins/validate-utility';

export default Ember.Route.extend(Validators, {

  actions: {
      forgotPassword: function(email) {
        var self = this;
        var host = 'http://localhost:8080';

         if (Ember.isEmpty(email)) {
            self.send('error', {name: 'Data Error', message: "Email cannot be empty."});
            return;
        }

          if (self.validateEmail(email)) {
             $.getJSON(host + "/email/forgetpassword?email=" + email);

          } else {
              self.send('error', { name: 'Data Error', message: "Email is not in the right format"});
        }
      }
    }
});
