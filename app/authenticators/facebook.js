/* global FB */
import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';

export default Base.extend({
    _getEducation: function (key, education) {
        var ret = "",
            i = 0;
        if (education) {
            for (i = 0; i < education.length; i++) {
                if (education[i].type === key) {
                    ret = education[i].school.name;
                    break;
                } else if (education[i].type === key) {
                    ret = education[i].school.name;
                    break;
                }
            }
        }
        return ret;
    },
    _getFacebookProfilePicture: function (type) {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            FB.api('/me/picture?type=' + type, function (response) {
                if (response && !response.error) {
                    Ember.run(resolve(response));
                } else {
                    reject(response);
                }
            });
        });
    },
    _setupUser: function (store) {
        var self = this;

        return new Ember.RSVP.Promise(function (resolve, reject) {
            FB.api('/me', function (fbUser) {
                var fbImageUrl = '';

                self._getFacebookProfilePicture('large').then(function (largeProfilePicture) {
                    fbImageUrl = largeProfilePicture.data.url;
                    var appController = self.get('container').lookup('controller:application');

                    var newMember = store.createRecord('member', {
                        firstName: fbUser.first_name,
                        lastName: fbUser.last_name,
                        gender: fbUser.gender,
                        facebookId: fbUser.id,
                        avatarUrl: fbImageUrl,
                        email: fbUser.email,
                        highSchool: self._getEducation('High School', fbUser.education),
                        college: self._getEducation('College', fbUser.education),
                        fhometown: fbUser.hometown ? fbUser.hometown.name : '',
                        flink: fbUser.link,
                        flocale: fbUser.locale,
                        flocation: fbUser.location ? fbUser.location.name : '',
                        ftimezone: fbUser.timezone,
                        isUser: true,
                        city: appController.get('baseCity'),
                        state: appController.get('baseState'),
                        isDestroyed: false,
                        isConfirmedMember: true
                    });

                    newMember.save().then(function (member) {
                        resolve(member);
                    }, function (error) {
                        var title = '',
                            message = '';

                        if (error.status) {
                            title = error.status + " " + error.statusText;
                            message = error.responseText;
                        } else if (error.message) {
                            title = error.name;
                            message = error.message;
                        }

                        reject({name: title, message: message});
                    });
                }, function () {
                    reject("Error when getting Facebook Picture");
                });
            });
        });
    },

    restore: function (data) {
        var self = this;

        return new Ember.RSVP.Promise(function (resolve, reject) {
            // this will be called when user has logged in and cookie is still valid
            if (!Ember.isEmpty(data.accessToken) && !Ember.isEmpty(data.id)) {

                // somehow simple-auth would turn the user model object into a regular Javasript object.  So I need to get the user object from store again
                // 2014-01-20 There is no store injected in the container in this authenticator, I have difficulty inject it properly by using the initializer.
                // Therefore, I'll use regular javascript object for the user in a session
                resolve(data);

                //self.get('container').lookup('service:store').findRecord('member', data.id).then(function (member) {
                //    data.user = member;
                //    resolve(data);
                //
                //}, function(error) {
                //    reject(error);
                //});

            } else {
                reject();
            }
        });

    },
    authenticate: function () {
        var self = this;

        return new Ember.RSVP.Promise(function (resolve, reject) {
            FB.getLoginStatus(function (fbResponse) {
                if (fbResponse.status === 'connected') {
                    // if logged in before, the cookie will have this status
                    Ember.run(function () {
                        var store = self.get('container').lookup('service:store');

                        store.findRecord('member', fbResponse.authResponse.userID).then(function (member) {

                            self._getFacebookProfilePicture('large').then(function (largeProfilePicture) {
                                var fbImageUrl = largeProfilePicture.data.url;

                                if (member.get('avatarUrl') !== fbImageUrl) {
                                    member.set('avatarUrl', fbImageUrl);
                                    member.save();
                                }

                                resolve({
                                    user: member,
                                    id: member.id,
                                    accessToken: fbResponse.authResponse.accessToken,
                                    facebookId: fbResponse.authResponse.userID
                                });
                            });
                        }, function (error) {
                            // Currently I couldn't find a good way to detect if a user exist or not, so I use error handling mechanism
                            if (error.message) {
                                self._setupUser(store).then(function (member) {
                                    resolve({
                                        user: member,
                                        id: member.id,
                                        accessToken: fbResponse.authResponse.accessToken,
                                        facebookId: fbResponse.authResponse.userID
                                    });
                                }, function (errorMessage) {
                                    reject(errorMessage);
                                });
                            } else {
                                reject(error);
                            }
                        });
                    });
                //} else if (fbResponse.status === 'not_authorized') {
                //    // if facebook App setup is wrong, we could come here
                //    reject();
                } else {
                    // status is unknown, then we must prompt with facebook login page
                    FB.login(function (fbResponse) {
                        if (fbResponse.authResponse) {
                            Ember.run(function () {
                                var store = self.get('container').lookup('service:store');

                                store.findRecord('member', fbResponse.authResponse.userID).then(function (member) {

                                    self._getFacebookProfilePicture('large').then(function (largeProfilePicture) {
                                        var fbImageUrl = largeProfilePicture.data.url;

                                        if (member.get('avatarUrl') !== fbImageUrl) {
                                            member.set('avatarUrl', fbImageUrl);
                                            member.save();
                                        }

                                        resolve({
                                            user: member,
                                            id: member.id,
                                            accessToken: fbResponse.authResponse.accessToken,
                                            facebookId: fbResponse.authResponse.userID
                                        });

                                    });
                                }, function () {
                                    self._setupUser(store).then(function (member) {
                                        resolve({
                                            user: member,
                                            id: member.id,
                                            accessToken: fbResponse.authResponse.accessToken,
                                            facebookId: fbResponse.authResponse.userID
                                        });
                                    }, function (errorMessage) {
                                        reject(errorMessage);
                                    });
                                });
                            });
                        } else {
                            reject({name: 'Info', message: 'FB Login Dialog closed without login'});
                        }
                    }, {scope: 'public_profile, email'});
                }
            }, true);
        });
    },
    invalidate: function (a, b, c) {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            if (!Ember.isEmpty(FB.getAccessToken())) {
                FB.logout(function (response) {
                    if (response) {
                        Ember.run(resolve);
                    } else {
                        Ember.run(reject);
                    }
                });
            } else {
                Ember.run(resolve);
            }
        });
    }
});
