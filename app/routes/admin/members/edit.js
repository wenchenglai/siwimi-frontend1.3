import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model(params) {
        return this.store.findRecord('member', params.id);
    },

    actions: {
        goBack: function() {
            var model = this.currentModel;

            if (model.get('hasDirtyAttributes')) {
                model.rollback();
            }

            history.back();
        },

        updateMember(member) {
            member.save().then(() => {
                this.transitionTo('admin.members');
            });
        }
    }
});
