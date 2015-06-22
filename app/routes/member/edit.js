import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
    return this.store.find('member', params.id);
  },

    afterModel: function(model, transition) {
        if (model.get('isDirty')) {
            model.rollback();
        }
    },
    actions: {
        cancel: function() {
            this.transitionTo('family.my');
        },
        save: function() {
            var self = this,
                model = self.currentModel;

            var onSuccess = function(member) {
                var session = self.get('session'),
                    userId = session.get('id');


                if (userId === member.get('id')) {
                    // reset the base location in case user changes the location
                    session.set('longitude', member.get('location')[0]);
                    session.set('latitude',  member.get('location')[1]);
                    session.set('baseCity', member.get('city'));
                    session.set('baseState', member.get('state'));

                    var controller = self.controllerFor('application');
                    controller.set('baseCity', member.get('city'));
                    controller.set('baseState', member.get('state'));
                }

                self.transitionTo('family.my');
            };

            var onFail = function(error) {
                throw new error('Saving New Member Error');
            };

            model.save().then(onSuccess, onFail);

        }
    }
});
