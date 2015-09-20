import Ember from 'ember';
import Validators from '../mixins/validate-utility';

export default Ember.Route.extend(Validators, {

    actions: {
        forgotPassword: function (email) {
            var self = this,
                host = self.store.adapterFor('application').get('host');

            if (Ember.isEmpty(email)) {
                self.send('error', {name: 'Data Error', message: "Email cannot be empty."});
                return;
            }

            if (self.validateEmail(email)) {
                $.getJSON(host + "/email/forgetpassword?email=" + email);

                self.send('showAlertBar', {
                    title: "Reset Password",
                    message: "We've sent you an email to reset your password.",
                    type : "alert-info"}
                );
            } else {
                self.send('error', {name: 'Data Error', message: "Email is not in the right format"});
            }
        }
    }
});
