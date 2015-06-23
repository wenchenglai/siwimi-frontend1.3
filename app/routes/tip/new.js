import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function() {
        var self = this,
            session = self.get('session');

        return self.store.createRecord('tip', {
            city: session.get('baseCity'),
            state: session.get('baseState'),
            zipCode: session.get('zipCode')});
    },

    actions: {
        save: function() {
            var self = this,
                model = self.get('controller.model'),
                userId = self.get('session.id');

            if (self.get('controller.isValid')) {
                self.store.find('member', userId).then(function(member) {
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
