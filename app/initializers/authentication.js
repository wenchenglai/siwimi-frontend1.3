//import CustomAuthenticator from '../authenticators/custom';
//import FacebookAuthenticator from '../authenticators/facebook';
import Ember from 'ember';
import Session from 'simple-auth/session';

export function initialize(container, application) {
    Session.reopen({
        userAccount: function() {
            if (!Ember.isEmpty(this.get('id'))) {
                return this.container.lookup('store:main').find('member', this.get('id'));
            }
        }.property('id')
    });
    //container.injection('authenticator:facebook', 'store', 'store:main');
}

export default {
  name: 'authentication',
  initialize: initialize
};
