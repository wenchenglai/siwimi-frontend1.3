import Ember from 'ember';

function findStates() {
    return [
            { id: "AL", name: "Alabama"},
            { id: "AK", name: "Alaska"},
            { id: "AZ", name: "Arizona"},
            { id: "AR", name: "Arkansas"},
            { id: "CA", name: "California"},
            { id: "CO", name: "Colorado"},
            { id: "CT", name: "Connecticut"},
            { id: "DE", name: "Delaware"},
            { id: "FL", name: "Florida"},
            { id: "GA", name: "Georgia"},
            { id: "HI", name: "Hawaii"},
            { id: "ID", name: "Idaho"},
            { id: "IL", name: "Illinois"},
            { id: "IN", name: "Indiana"},
            { id: "IA", name: "Iowa"},
            { id: "KS", name: "Kansas"},
            { id: "KY", name: "Kentucky"},
            { id: "LA", name: "Louisiana"},
            { id: "ME", name: "Maine"},
            { id: "MD", name: "Maryland"},
            { id: "MA", name: "Massachusetts"},
            { id: "MI", name: "Michigan"},
            { id: "MN", name: "Minnesota"},
            { id: "MS", name: "Mississippi"},
            { id: "MO", name: "Missouri"},
            { id: "MT", name: "Montana"},
            { id: "NE", name: "Nebraska"},
            { id: "NV", name: "Nevada"},
            { id: "NH", name: "New Hampshire"},
            { id: "NJ", name: "New Jersey"},
            { id: "NM", name: "New Mexico"},
            { id: "NY", name: "New York"},
            { id: "NC", name: "North Carolina"},
            { id: "ND", name: "North Dakota"},
            { id: "OH", name: "Ohio"},
            { id: "OK", name: "Oklahoma"},
            { id: "OR", name: "Oregon"},
            { id: "PA", name: "Pennsylvania"},
            { id: "RI", name: "Rhode Island"},
            { id: "SC", name: "South Carolina"},
            { id: "SD", name: "South Dakota"},
            { id: "TN", name: "Tennessee"},
            { id: "TX", name: "Texas"},
            { id: "UT", name: "Utah"},
            { id: "VT", name: "Vermont"},
            { id: "VA", name: "Virginia"},
            { id: "WA", name: "Washington"},
            { id: "WV", name: "West Virginia"},
            { id: "WI", name: "Wisconsin"},
            { id: "WY", name: "Wyoming"}
    ];
}

export default Ember.Controller.extend({
    //locations: [{ label: "Ann Arbor, MI", value: "Ann Arbor, MI"},
    //    {label: "ARR, MI", value: "ARR, MI"},
    //    {label: "BB, MI", value: "BB, MI"},
    //    {label: "CC, MI", value: "CC, MI"},
    //    {label: "ARR1, MI", value: "ARR1, MI"},
    //    {label: "ARR2, MI", value: "ARR2, MI"},
    //    {label: "ARR3, MI", value: "ARR3, MI"},
    //],
    locations: function(requestObj, responseCB) {
        //var host = 'http://localhost:8080';
        var host = 'http://199.223.236.115:8080/siwimi-webapi-0.0.1';
        $.ajax({
            url: host + "/locationsjquery?queryText=" + requestObj.term,
            success: function( data ) {
                responseCB( data );
            }
        });

        //responseCB(
        //[{ label: "Ann Arbor, MI", value: "Ann Arbor, MI"},
        //    {label: "ARR, MI", value: "ARR, MI"},
        //    {label: "BB, MI", value: "BB, MI"},
        //    {label: "CC, MI", value: "CC, MI"},
        //    {label: "ARR1, MI", value: "ARR1, MI"},
        //    {label: "ARR2, MI", value: "ARR2, MI"},
        //    {label: "ARR3, MI", value: "ARR3, MI"},
        //]);
    },

    selectEvent: function(event, ui) {
        this.set('selectedLocation', ui.item.label);
    },

    selectedLocation: null,
    isLoading: false,
    state: 'UT',
    filteredStates: findStates(),

    //disabledImportFacebook: function () {
    //    return Ember.isEmpty(this.get('facebookId'));
    //}.property('facebookId'),

    hasOldPassword: function() {
        var pass = this.get('password'),
            ret = false;
        if (pass) {
            if (pass !== '') {
                ret = true;
            }
        }
        return ret;
    }.property('password'),

    filterStatesBy: function(term) {
        var states = findStates();
        if (!term) {
            return states;
        }
        var filter = new RegExp('^'+term, 'i');
        return states.filter(function(state) {
            return filter.test(state.name) || filter.test(state.id);
        });
    },

    actions: {
        filterStates: function(autocomplete, term) {
            this.set('filteredStates', this.filterStatesBy(term));
        },
        resetStates: function() {
            this.set('filteredStates', findStates());
        },
        selectEvent: function(event, ui) {
            //this.set('selectedLocation', ui.item.label);
            var a = event;
        },
        save: function () {
            var self = this,
                fromModel = this.get('model'),
                hasError = false;

            var onSuccess = function () {
                self.send('showAlertBar', {
                    title: 'Success',
                    message: 'Your account info has been saved.',
                    type: 'alert-success'
                });
            };

            var onFail = function (error) {
                self.send('error', error);
            };

            if (self.get('newPassword')) {
                if (self.get('newPassword') !== self.get('newPassword2') ) {
                    self._toggleAlert(true, 'Error', 'New passwords must match.', 'alert-danger');
                    hasError = true;
                } else {
                    if (self.get('password')) {
                        if (self.get('password') === self.get('oldPassword')) {
                            fromModel.set('password', self.get('newPassword'));
                        } else {
                            self._toggleAlert(true, 'Error', 'Old password is wrong.', 'alert-danger');
                            hasError = true;
                        }
                    } else {
                        // user has no password yet, so as long as the new passwords match, we save it
                        fromModel.set('password', self.get('newPassword'));
                    }
                }
            }

            if (!hasError) {
                fromModel.save().then(onSuccess, onFail);
            }
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

            FB.api('/me?fields=id,name,address,email,birthday', function (fbUser) {
                if (!fromModel.get('email')) {
                    fromModel.set('email', fbUser.email);
                }

                if (!fromModel.get('facebookId')) {
                    fromModel.set('facebookId', fbUser.id);
                }
            });
        }
    }
});
