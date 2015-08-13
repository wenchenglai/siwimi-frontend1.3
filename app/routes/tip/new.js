import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function() {
        var self = this,
            city = self.get('session.secure.user.city'),
            state = self.get('session.secure.user.state'),
            zipCode = self.get('session.secure.user.zipCode');

        return self.store.createRecord('tip', {
            city: city,
            state: state,
            zipCode: zipCode
        });
    },

    actions: {
        save: function() {
            var self = this,
                model = self.get('controller.model'),
                userId = self.get('session.secure.id');

            if (self.get('controller.isValid')) {
                self.store.findRecord('member', userId).then(function(member) {
                    model.set('createdDate', new Date());
                    model.set('creator', member);

                    model.save().then(function(tip) {
                        self.transitionTo('tip.show', tip.id);
                    });
                });
            } else {
                self.send('error', error);
            }
            return false;
        },

        cancel: function() {
            this.transitionTo('tip.my');
        }
    }
});
