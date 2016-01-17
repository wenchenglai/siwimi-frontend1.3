import Ember from 'ember';
import SessionSetupMixin from '../../mixins/session-setup';
import Validators from '../../mixins/validate-utility';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, SessionSetupMixin, Validators, {
    queryParams: {
        userId: {
            refreshModel: false
        }
    },

    model: function(params) {
        var self = this;

        // There are two possible ways to sign up - by invitation or by user him/herself
        if (params.userId) {
            // by invitation - the process already has a user created because user comes to this page from a link
            // generated from the back end that contains user Id.
            return self.store.findRecord("member", params.userId);
        } else {
            // regular sign up process as a totally new user
            return self.store.createRecord("member");
        }
    },

    actions: {
        signUp: function () {
            var self = this,
                controller = self.get('controller'),
                newMember = self.currentModel,
                newMemberId = newMember.get('id'),
                password2 = controller.get('password2'),
                appController = self.controllerFor('application');

            if (Ember.isEmpty(newMember.get("email")) || Ember.isEmpty(newMember.get("firstName")) || Ember.isEmpty(newMember.get("lastName"))) {
                self.send('error', { name: 'Data Error', message: "Email and User Name cannot be empty." });
                return;
            }

            if (self.validateEmail(newMember.get("email"))) {
                if (newMember.get("password") === password2 && password != null) {

                    newMember.setProperties({
                        isUser: true,
                        isInSignUpProcess: true,
                        isConfirmedMember: newMemberId ? true : false,
                        privilege: 1,
                        city: appController.get('baseCity'),
                        state: appController.get('baseState')
                    });

                    newMember.save().then(function(member) {
                        var session = self.get('session'),
                            host = self.store.adapterFor('application').get('host');

                        if (member.get("invitedBy")) {
                            // invitation user alreayd has email confirmed, so we can skip the email confirmation process and go to sing up step 2
                            self.transitionTo('register.signup2', member);
                        } else {
                            // a new user will need to confirm by email
                            self.transitionTo('index', {queryParams: {
                                showAlert: true,
                                title: 'Sign Up',
                                message: 'Thanks for signing up.  Please check your email for confirmation.  You might need to check your spam email inbox.',
                                type: 'alert-info'
                            }});
                        }
                    }, function(error) {
                        self.send('error', error);
                    });
                } else {
                    self.send('error', { name: 'Data Error', message: "Passwords don't match." });
                }
            } else {
                self.send('error', { name: 'Data Error', message: "Email is not in the right format"})
            }
        },
    }
});
