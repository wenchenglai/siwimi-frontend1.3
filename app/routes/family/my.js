import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function () {
        var self = this,
            family = self.get('session.user.family'),
            familyId = self.get('session.user.family.id');

        if (typeof(family) === 'string') {
            return self.store.find('family', family);
        } else if (familyId) {
            return self.store.find('family', familyId);
        }
        return null;
    },

    actions: {
        goToEditFamily: function (family) {
            this.transitionTo('family.edit', family);
        },

        deleteFamily: function (id) {
            var self = this;
            self.store.find('family', id).then(function (record) {
                record.destroyRecord().then(function() {
                    
                });
            });
        },

        goToAddMember: function (familyId) {
            this.transitionTo('member.new', {queryParams: {famlyId: familyId}});
        },

        goToEditMember: function (member) {
            this.transitionTo('member.edit', member);
        },

        deleteMember: function(id) {
            this.store.find('member', id).then(function (record) {
                record.destroyRecord();
            });
        }
    }
});
