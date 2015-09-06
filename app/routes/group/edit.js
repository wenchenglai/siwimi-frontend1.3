import Ember from 'ember';

export default Ember.Route.extend({
     model: function(params) {
    return this.store.find('group', params.id);
  },

    afterModel: function(model, transition) {
        if (model.get('hasDirtyAttributes')) {
            model.rollback();
        }
    },
    actions: {
        save: function() {
            var self = this;

            self.currentModel.save().then(function(group) {
                if (self.controllerFor('application').get('previousURL') === '/group/my') {
                    self.transitionTo('group.my');
                } else {
                    self.transitionTo('group.show', group);
                }
            });
        },

        cancel: function() {
            var self = this;

            self.currentModel.rollback();
            self.transitionTo('group.my');
        }
    }
});
