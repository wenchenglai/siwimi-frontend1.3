import Ember from 'ember';
import ENV from '../../config/environment';

export default Ember.Route.extend({
    model: function(params) {
        return this.store.findRecord('group', params.id);
    },

    actions: {
        goBack: function() {
            var self = this,
                session = self.get('session'),
                previousURL = self.controllerFor('application').get('previousURL');

            if (previousURL) {
                self.transitionTo(previousURL);
            } else {
                self.transitionTo('group.my');
            }
        },

        showList: function() {
            var self = this;

            self.controller.set('showList', true);
            self.controller.set('showAddNew', false);
        },

        showAddNew: function() {
            var self = this;

            self.controller.set('showList', false);
            self.controller.set('showAddNew', true);
        },

        inviteFriend: function(email) {
            var self = this,
                userId = self.get('session.secure.id'),
                groupId = self.currentModel.get('id'),
                host = ENV.apiHost,
                api = "%@/email/invite?email=%@&userid=%@&groupid=%@".fmt(host, email, userId, groupId);

            $.getJSON(api);

            self.send('showAlertBar', {
                title: 'Success',
                message: "We've sent your friend an invitation email.",
                type: 'alert-success'
            });
        }
    }
});
