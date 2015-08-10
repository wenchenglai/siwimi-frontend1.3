/* global FB */
import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
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
