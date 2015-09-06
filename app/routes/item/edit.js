import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
     model: function(params) {
    return this.store.find('item', params.id);
  },

    afterModel: function(model) {
        if (model.get('hasDirtyAttributes')()) {
            model.rollback();
        }
    },

    actions: {
        save: function() {
            var self = this,
                model = self.currentModel;

            model.save().then(function(item) {
                self.transitionTo('item.show', item);
            });

        },

        cancel: function() {
            this.transitionTo('item.show', this.currentModel);
        }
    }
});
