import Ember from 'ember';

export default Ember.ObjectController.extend({
    showAlert: false,
    alertTitle: "",
    alertMessage: "",
    alertType: "",
    
    disabledImportFacebook: function () {
        return Ember.isEmpty(this.get('facebookId'));
    }.property('facebookId'),

    _toggleAlert: function(flag, title, message, type) {
        var self = this;
        self.set('showAlert', flag);
        self.set('alertTitle', title);
        self.set('alertMessage', message);
        self.set('alertType', type);
    },

    deactivate: function() {
        var self = this;
        self._toggleAlert(false);
    },

    actions: {
        save: function () {
            var self = this,
                fromModel = this.get('model');

            self._toggleAlert(false);

            var onSuccess = function () {
                self._toggleAlert(true, 'Success', 'Your account info has been saved.', 'alert-success');
            };

            var onFail = function () {
                self._toggleAlert(true, 'Error', 'while saving data.', 'alert-danger');
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
        },

        importFromFacebook: function () {
            var self = this,
                fromModel = self.get('model');

            FB.api('/me?fields=id,name,location,education,hometown,birthday,first_name,last_name,gender', function (fbUser) {
                fromModel.set('facebookId', fbUser.id);

                if (!fromModel.get('firstName')) {
                    fromModel.set('firstName', fbUser.first_name);
                }

                if (!fromModel.get('lastName')) {
                    fromModel.set('lastName', fbUser.last_name);
                }

                if (!fromModel.get('gender')) {
                    fromModel.set('gender', fbUser.gender);
                }

                if (!fromModel.get('birthday')) {
                    if (fbUser.birthday) {
                        fromModel.set('birthday', new Date(self._getISODateString(fbUser.birthday)));
                    }
                }

                if (!fromModel.get('fhometown')) {
                    fromModel.set('fhometown', fbUser.hometown.name);
                }

                if (!fromModel.get('flocation')) {
                    fromModel.set('flocation', fbUser.location.name);
                }

                if (!fromModel.get('highSchool')) {
                    fromModel.set('highSchool', fbUser.education[0].school.name);
                }

                if (!fromModel.get('college')) {
                    fromModel.set('college', fbUser.education[1].school.name);
                }
            });
        },

        closeAlert: function() {
            var self = this;
            self._toggleAlert(false);
        }
    }
});