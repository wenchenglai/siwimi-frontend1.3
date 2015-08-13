import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        var self = this,
            city = self.get('session.secure.user.city'),
            state = self.get('session.secure.user.state'),
            zipCode = self.get('session.secure.user.zipCode');

        return self.store.createRecord('item', {
            city: city,
            state: state,
            zipCode: zipCode
        });
    },

    actions: {
        cancel: function () {
            this.transitionTo('item.my');
        },

        save: function () {
            var self = this,
                model = self.currentModel,
                userId = self.get('session.secure.id');

            self.store.find('member', userId).then(function(user) {
                model.set('creator', user);
                model.set('status', 'active');
                model.set('isDeletedRecord', false);
                model.set('createdDate', new Date());

                var onSuccess = function (item) {
                    self.transitionTo('item.show', item.id);
                };

                var onFail = function (error) {
                    self.send('error', error);
                };

                model.save().then(onSuccess, onFail);
            });
        }
    }
});
