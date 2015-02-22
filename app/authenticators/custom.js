// custom

import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';

export default Base.extend({
    restore: function(data) {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            if (!Ember.isEmpty(data.id)) {
                resolve(data);
            } else {
                reject();
            }
        });
    },
    authenticate: function(options) {
        var self = this;

        return new Ember.RSVP.Promise(function (resolve, reject) {
            self._executeAjax(options.host + '/login', {
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    email: options.email,
                    password: options.password
                })
            }
            ).then(function (data) {
                if (data.auth === 'success' && data.member.id) {
                    Ember.run(function () {
                        self.get('container').lookup('store:main').find('member', data.member.id).then(function(user) {
                            resolve({
                                id: user.id,
                                user: user
                            });
                        });
                    });
                } else {
                    reject({
                        name: 'Login failed',
                        message: "email or password don't match"
                    });
                };
            });
        });
    },
    invalidate: function(data) {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            var options = data;
            options.test = 'a';
            if (1) {
                Ember.run(resolve);
            } else {
                Ember.run(reject);
            }
            
        });
    },
    _executeAjax: function(url, options){
        return new Ember.RSVP.Promise(function (resolve, reject) {
            options = options || {};

            options.success = function (data) {
                Ember.run(null, resolve, data);
            };

            options.error = function () {
                Ember.run(null, reject, arguments);
            };

            Ember.$.ajax(url, options);
        });
    }
});