/* global FB */
import Ember from 'ember';

export default Ember.Controller.extend({
    contentTemplate: 'user/profile-form',

    navItems: [Ember.Object.create({
        isActived: true,
        title: 'Profile',
        template: 'user/profile-form'
    }), Ember.Object.create({
        isActived: false,
        title: 'Group',
        template: 'user/notification-form'
    }), Ember.Object.create({
        isActived: false,
        title: 'Notification Center',
        template: 'user/notification-form'
    })],
    actions: {
        render: function (template) {
            this.set('contentTemplate', template);
        },

        toggleSwitch: function (name, checked) {
            console.log('toggleSwitch:', name, checked);
            var noti = this.get('model').get('notification');
            noti.set(name, checked);
            noti.content.save();
        },

        save: function () {
            var self = this,
                fromModel = this.get('model');

            var onSuccess = function() {
                self.send('showAlertBar', {
                    title: 'Success',
                    message: 'Your profile info has been saved.',
                    type: 'alert-success'
                });
            };

            var onFail = function (error) {
                self.send('error', error);
            };

            fromModel.save().then(onSuccess, onFail);
        },

        cancel: function() {
            var handlers = this.get('target').router.oldState.handlerInfos,
                handler = handlers[handlers.length-1];

            if (handler) {
                this.get('target').transitionTo(handler.name);
            } else {
                this.get('target').transitionTo('index');
            }
        }
    }
});
