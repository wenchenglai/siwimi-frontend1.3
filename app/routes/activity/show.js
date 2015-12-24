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

    afterModel: function(model, transition) {
        var event = Ember.isEmpty(model.activity) ? model : model.activity,
            title = event.get('title');

        // There are two entry points to this function:
        // 1.  This funciton is called by regular loading i.e. user click on the list, and we load the event using model function above
        // 2.  The afterModel is called without calling model above, because we transitionTo with the event object from other pages i.e. edit page

        Ember.$(document).attr('title', "Siwimi - Events - " + title);
        Ember.$("meta[name='description']").attr('content', "Siwimi is for parents who have young childnre.  Check out this event! ");
        Ember.$("meta[property='og\\:title']").attr("content", title);
        Ember.$("meta[property='og\\:description']").attr("content", title);
    },

    setupController: function(controller, model) {
        controller.set('model', model);

        // I have to move the URL code here because window.location.href won't be updated until this point
        Ember.run.schedule('afterRender', () => {
            console.log( this.get('router.url'))

            Ember.$("meta[property='og\\:url']").attr("content", window.location.href);
            //$("meta[property='og\\:image']").attr("content", model.activity.get('imageData'));

            controller.set('currentUrl', window.location.href);
        });

    },

    actions: {
        goBack: function() {
            var self = this,
                previousURL = self.controllerFor('application').get('previousURL');

            if (previousURL.indexOf("/activity/browse") > -1) {
                history.back();
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

            if (model.groups.get('length') === 0) {
                return self.render('modals/create-group-modal', {
                    into: 'application',
                    outlet: 'modal'
                });
            }

            var api = "%@/email/notify-events?userId=%@&eventId=%@".fmt(host, userId, eventId);

            model.groups.forEach(function(group, index, enumerable){
                if (group.get('isChecked')) {
                    api += "&groupId=" + group.get('id');
                }
            });

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
