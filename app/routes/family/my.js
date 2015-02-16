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
                    self.store.find('member', self.get('session.id')).then(function(user) {
                        user.set('family', null);
                        user.save().then(function() {
                            self.get('session').set('user', user);
                            self.refresh();
                        });
                    });
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
                if (!record.get('isUser')) {
                    record.destroyRecord();
                } else {
                    // this member is a user, so we cannot delete this member.  But we have to de-associate this member from this family
                    record.set('family', null);
                    record.save();
                }
            });
        }
    }
});
