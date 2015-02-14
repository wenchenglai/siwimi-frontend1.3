import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function() {
        var self = this;
        return self.store.createRecord('family');
    }, 

    disabled: function () {
        return Ember.isEmpty(this.get('familyName')) || Ember.isEmpty(this.get('zipCode'));
    }.property('familyName', 'zipCode'),

    actions: {
        save: function (params) {
            var self = this,
                model = self.currentModel,
                zipCode = model.get('zipCode'),
                session = self.get('session');

            var onSuccess = function (json) {
                var cityState = json.results[0].formatted_address;

                model.set('cityState', cityState);

                model.save().then(function (newlySavedfamily) {
                    var userId = self.get('session.id');

                    // after we create a new family, we should add current user as a member of the family
                    self.store.find('member', userId).then(function(member) {
                        member.set('family', newlySavedfamily);
                        member.save().then(function(user) {
                            session.set("user", user);
                            self.transitionTo('family.show', newlySavedfamily);
                        }, onFail);
                    }, onFail);
                }, onFail);
            };

            var onFail = function (error) {
                // deal with the failure here
                self.set('showError', true);
                self.set('errorMessage', "Error in Connect.AddFamily Controller: " + error.message);
            };

            var onGoogleApiFail = function (error) {
                // deal with the failure here
                self.set('showError', true);
                self.set('errorMessage', error.statusText + ": " + error.responseText);
            };

            // we need to get the cityState info based on the provided zip code using Google API
            Em.$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + zipCode + '&sensor=true').then(onSuccess, onGoogleApiFail);
        },

        cancel: function() {
            this.transitionTo('family.my');
        }
    }
});
