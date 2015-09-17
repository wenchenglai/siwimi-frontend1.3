import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        var self = this,
            userId = self.get('session.secure.id'),
            query = {
                member: userId,
                event: params.id
            };

        return Ember.RSVP.hash({
            activity: self.store.findRecord('activity', params.id),
            emactions: self.store.query('emaction', query)
        });
    },

    actions: {
        goBack: function() {
            var self = this,
                session = self.get('session'),
                previousURL = self.controllerFor('application').get('previousURL');

            if (previousURL) {
                self.transitionTo(previousURL);
            } else {
                self.transitionTo('activity.browse');
            }
        },

        setAction: function(selectedValue) {
            var self = this,
                userId = self.get('session.secure.id'),
                model = self.currentModel,
                emaction = model.emactions.get('firstObject');

            if (emaction) {
                emaction.set('action', selectedValue);
                emaction.save();
            } else {
                self.store.findRecord('member', userId).then(function(user) {
                    var newRecord = self.store.createRecord('emaction', {
                        event: model.activity,
                        member: user,
                        action: selectedValue,
                        createdDate: new Date()
                    });

                    newRecord.save();
                });                
            }

            // show message so people know the benefit of this feature
            self.render('modals/event-member', {
                into: 'application',
                outlet: 'modal'
            });
        },

        closeModal: function() {
            this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });
        }
    }
});
