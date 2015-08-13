import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function (param) {
        return this.store.findRecord('message', param.id);
    },

    afterModel: function (model, transition) {
        var self = this,
            userId = self.get('session.secure.id');

        if (userId === model.get('to.id')) {
            if (model.get('toStatus') === "unread") {
                model.set('toStatus', 'read');
            }
        }
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
        },

        reply: function() {
            var self = this,
                model = self.currentModel;

            self.transitionTo('inbox.new', {queryParams: {toId: model.get('from.id'), rootMessage: model.get('id')}});
        }
    }
});
