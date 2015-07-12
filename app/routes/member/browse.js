import Ember from 'ember';

export default Ember.Route.extend({
    model: function (params) {
        var self = this;
        return self.store.find('member', params);
    },

    afterModel: function(model, transition) {
        var member;

        // we need to check if this member is still in sign up process
        // #TODO the design problem here is if we just want to see a member's data that's also in sign up process, we couldn't see it
        // we need to design a better API here
        if (model.get('length') === 1) {
            member = model.get('content')[0];
            if (member.get('isConfirmedMember') && member.get('isInSignUpProcess')) {
                this.transitionTo('signup2', member);
            }
        }
    }
});
