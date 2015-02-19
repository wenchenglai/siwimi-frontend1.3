import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        var self = this;
        return self.store.createRecord('item');
    }, 

    actions: {
        cancel: function () {
            this.transitionTo('item.my');
        },
        save: function () {
            var self = this,
                model = self.currentModel,
                userId = self.get('session.id');

            self.store.find('member', userId).then(function(user) {
                model.set('creator', user);
                model.set('isDestroyed', false);
                model.set('createdDate', new Date());

                var onSuccess = function (item) {
                    self.transitionTo('item.show', item);
                };

                var onFail = function (error) {
                    throw new error('Saving New Item Error');
                };

                model.save().then(onSuccess, onFail);
            });
        }
    }
});
