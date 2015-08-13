import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        var self = this,
            city = self.get('session.secure.user.city'),
            state = self.get('session.secure.user.state'),
            zipCode = self.get('session.secure.user.zipCode');

        return self.store.createRecord('question', {
            city: city,
            state: state,
            zipCode: zipCode
        });
    },

    actions: {
        save: function () {
            var self = this,
                model = self.currentModel,
                session = self.get('session'),
                userId = self.get('session.secure.id');

            if (session.isAuthenticated) {
                self.store.findRecord('member', userId).then(function (user) {
                    model.set('creator', user);
                    model.set('status', 'Open');
                    model.set('isDeletedRecord', false);
                    model.set('createdDate', new Date());

                    model.save().then(function (obj) {
                        self.transitionTo('questions.show', obj.id);
                    });
                });
            } else {
                //self.controllerFor('login').set('model', '');
                return self.render('loginModal', {
                    into: 'application',
                    outlet: 'modal'
                });
            }
        },

        closeModal: function() {
            this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });
        }
    }
});
