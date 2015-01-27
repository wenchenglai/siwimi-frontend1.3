// facebook

import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';

export default Base.extend({
    _getEducation: function (key, education) {
        var ret = "",
            i = 0;

        for (i = 0; i < education.length; i++) {
            if (education[i].type === key) {
                ret = education[i].school.name;
                break;
            } else if (education[i].type === key) {
                ret = education[i].school.name;
                break;
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

                    var newMember = store.createRecord('member', {
                        firstName: fbUser.first_name,
                        lastName: fbUser.last_name,
                        gender: fbUser.gender,
                        facebookId: fbUser.id,
                        avatarUrl: fbImageUrl,
                        largePicture: fbImageUrl,
                        highSchool: self._getEducation('High School', fbUser.education),
                        college: self._getEducation('College', fbUser.education),
                        fhometown: fbUser.hometown.name,
                        flink: fbUser.link,
                        flocale: fbUser.locale,
                        flocation: fbUser.location.name,
                        ftimezone: fbUser.timezone,
                        isUser: true,
                        isDestroyed: false
                    });

                    newMember.save().then(function (member) {
                        resolve(member);
                    }, function () {
                        reject("Error when saving new member to system");
                    });
                }, function () {
                    reject("Error when getting Facebook Picture");
                });
            });
        });
    },
    restore: function(data) {
        var self = this;

        return new Ember.RSVP.Promise(function (resolve, reject) {
            if (!Ember.isEmpty(data.accessToken)) {
                // this will be called when user has logged in and cookie is still valid
                // somehow simple-auth would turn the user model object into a regular Javasript object.  So I need to get the user object from store again
                // 2014-01-20 There is no store injected in the container in authenticator, I have dificulty inject it properly by using the initializer.
                // Therefore, I'll use regular javascript object for the user in a session
                if (data.id) {
                    resolve(data);
                } else {
                    reject();
                }
                //self.get('container').lookup('store:main').find('member', data.id).then(function (member) {
                //    data.user = member;
                //    resolve(data);
                //}, function(error) {
                //    reject();
                //    this.controllerFor('error').set('error', error);
                //    this.transitionTo('error');
                //});
                
            } else {
                reject();
            }
        });
      
    },
    authenticate: function() {
        var self = this;

        return new Ember.RSVP.Promise(function (resolve, reject) {
            FB.getLoginStatus(function (fbResponse) {
                if (fbResponse.status === 'connected') {
                    // if logged in before, the cookie will have this status
                    Ember.run(function () {
                        var store = self.get('container').lookup('store:main');

                        store.find('member', fbResponse.authResponse.userID).then(function (member) {
                            var adapter = store.adapterFor('application'),
                                userObj = adapter.serialize(member);

                            resolve({
                                user: member,
                                currentUser: userObj,
                                id: member.id,
                                accessToken: fbResponse.authResponse.accessToken,
                                facebookId: fbResponse.authResponse.userID
                            });
                        }, function (error) {
                            if (error.message) {
                                self._setupUser(store).then(function(member) {
                                    resolve({
                                        user: member,
                                        id: member.id,
                                        accessToken: fbResponse.authResponse.accessToken,
                                        facebookId: fbResponse.authResponse.userID
                                    });
                                }, function(errorMessage) {
                                    reject(errorMessage);
                                });
                            } else {
                                reject("Error in find a member");
                            }
                        });
                    });
                } else if (fbResponse.status === 'not_authorized') {
                    // if facebook App setup is wrong, we could come here
                    reject();
                } else {
                    // status is unknown, then we must prompt with facebook login page
                    FB.login(function (fbResponse) {
                        if (fbResponse.authResponse) {
                            Ember.run(function () {
                                var store = self.get('container').lookup('store:main');

                                store.find('member', fbResponse.authResponse.userID).then(function (member) {
                                    resolve({
                                        user: member,
                                        id: member.id,
                                        accessToken: fbResponse.authResponse.accessToken,
                                        facebookId: fbResponse.authResponse.userID
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
                            reject();
                        }
                    }, {scope: 'public_profile,email'});
                }
            });
        });      
    },
    invalidate: function() {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            FB.logout(function (response) {
                if (response) {
                    Ember.run(resolve);
                } else {
                    Ember.run(reject);
                }
            });
        });      
    },

    sessionDataUpdated: function() {
        var a = 3;
        var b = 4;
        a = a + b;
    }
});