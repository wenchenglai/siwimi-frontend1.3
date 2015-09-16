import Ember from 'ember';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
    model: function(params) {
    return this.store.findRecord('member', params.id);
     },

    actions: {
      resetPassword: function (member) {
          var self = this,
              newPassword = member.get('newPassword'),
              confirmPassword = member.get('confirmPassword');

        if (newPassword === confirmPassword) {
              member.setProperties({
                password: newPassword
          });

            member.save().then(function() {
            member.set('newPassword', '');
            member.set('confirmPassword', '');
            self.transitionTo('login');
            });

          } else {
             self.send('error', { name: 'Data Error', message: "Passwords do not match." });
                return;
          }
      }
    }
});
