import Ember from 'ember';
import ENV from '../../config/environment';

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
            emactions: self.store.query('emaction', query),
            groups: self.store.query('group', {creator: userId})
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
                emaction = model.emactions.get('content')[0];

            if (!self.get('session.isAuthenticated')) {
                return self.render('loginModal', {
                    into: 'application',
                    outlet: 'modal'
                });
            }

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

                    newRecord.save().then(function(newEmaction) {
                        model.emactions.pushObject(newEmaction);
                    });
                });                
            }
        },

        notifyMyFriends: function() {
            var self = this,
                model = self.currentModel,
                userId = self.get('session.secure.id'),
                eventId = model.activity.id,
                actionTaken = model.emactions.firstObject.action,
                host = ENV.apiHost;

            if (Ember.isEmpty(userId)) {
                return self.render('loginModal', {
                    into: 'application',
                    outlet: 'modal'
                });
            }

            var api = "%@/email/notify-events?userId=%@&eventId=%@".fmt(host, userId, eventId);

            $.getJSON(api);

            self.send('showAlertBar', {
                title: 'Success',
                message: "We've notified your friends about this event.",
                type: 'alert-success'
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
