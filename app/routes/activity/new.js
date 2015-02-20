import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        var self = this;
        return self.store.createRecord('activity');
    }, 

    actions: {
        cancel: function () {
            this.transitionTo('activity.my');
        },
        save: function () {
            var self = this,
                model = self.currentModel,
                userId = self.get('session.id');

            self.store.find('member', userId).then(function(user) {
                model.set('creator', user);
                model.set('isDestroyed', false);
                model.set('createdDate', new Date());

                var onSuccess = function (obj) {
                    self.transitionTo('activity.show', obj);
                };

                var onFail = function (error) {
                    throw new error('Saving New Activity Error');
                };

                model.save().then(onSuccess, onFail);
            });
        }
    }
});
