import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function (param) {
        return this.store.find('message', param.id);
    },

    actions: {
        delete: function () {
            var self = this;
            self.currentModel.destroyRecord().then(function(record) {
                self.transitionTo('inbox.browse');
            }, function(error) {
                console.log(error);
                self.transitionTo('inbox.browse');
            });
        }
    }
});
