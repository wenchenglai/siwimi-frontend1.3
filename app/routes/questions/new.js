import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        var self = this;
        return self.store.createRecord('question');
    }, 

    actions: {
        save: function () {
            var self = this,
                model = self.currentModel,
                userId = self.get('session.id');

            self.store.find('member', userId).then(function (user) {
                model.set('creator', user);
                model.set('status', 'Open');
                model.set('isDestroyed', false);
                model.set('createdDate', new Date());

                model.save().then(function (record) {
                    self.controller.set("asked", true);
                });
            });
        }
    }
});
