import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function() {
        var self = this,
            id = self.get('session.secure.id');

            return self.store.findRecord('member', id);
    },

    _getFacebookEducation(educations, type) {
        var schoolName = "",
            school = window._.find(educations, function(obj) { return obj.type === type; });

        if (school) {
            schoolName = school.school.name;
        }

        return schoolName;
    },

    _getISODateString: function (date) {
        if (date) {
            var com = date.split("/");

            return com[0] + "-" + com[1] + "-" + com[2];
        }
    },

    actions: {
        importFromFacebook: function () {
            var self = this,
                fromModel = self.currentModel;

            FB.login(function(response) {
                if (response.status === 'connected') {
                    FB.api('/me?fields=id,location,education,hometown,birthday,first_name,last_name,gender', function (fbUser) {
                        if (fbUser.error) {
                            self.send('error', {name: fbUser.error.type, message: fbUser.error.message})
                        } else {
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
                                if (fbUser.hometown) {
                                    fromModel.set('fhometown', fbUser.hometown.name);
                                }
                            }

                            if (!fromModel.get('highSchool')) {
                                if (fbUser.education) {
                                    fromModel.set('highSchool', self._getFacebookEducation(fbUser.education, 'High School'));
                                }
                            }

                            if (!fromModel.get('college')) {
                                if (fbUser.education) {
                                    fromModel.set('college', self._getFacebookEducation(fbUser.education, 'College'));
                                }
                            }

                            self.send('showAlertBar', {
                                title: 'Facebook Account Sync',
                                message: 'Update data from Facebook successfully',
                                type : 'alert-info'});
                        }
                    });
                } else if (response.status === 'unknown') {
                    self.send('error', {name: "Error", message:"User cancelled Facebook login"})
                } else {
                    var session = self.get('session');

                    session.authenticate('authenticator:facebook', {}).then(function () {

                    }, function (error) {
                        self.send('error', error);
                    });
                }
            }, {scope: 'user_birthday, user_education_history, user_hometown'});
        }
    }
});
