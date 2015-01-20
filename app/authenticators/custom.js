// custom

import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';

export default Base.extend({
    restore: function(data) {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            if (!Ember.isEmpty(data.accessToken)) {
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
                if (data.auth === 'success') {
                    Ember.run(function () {
                        var user = self.get('container').lookup('store:main').createRecord('Member', data.member);
                        resolve({
                            user: user
                        });
                    });
                } else {
                    reject(data.auth);
                }
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