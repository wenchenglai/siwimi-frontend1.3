import Ember from 'ember';

export default Ember.Route.extend({
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
