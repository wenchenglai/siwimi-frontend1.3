import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        var self = this;
        return self.store.createRecord('group');
    },

    actions: {
        save: function () {
            var self = this,
                model = self.currentModel,
                userId = self.get('session.secure.id');

            self.store.find('member', userId).then(function(user) {
                model.set('creator', user);
                model.set('isDestroyed', false);
                model.set('createdDate', new Date());

                var onSuccess = function (obj) {
                    self.transitionTo('group.show', obj);
                };

                var onFail = function (error) {
                    self.send('error', error);
                };

                model.save().then(onSuccess, onFail);
            });
        },

        cancel: function() {
            this.transitionTo('group.my');
        }
    }
});
