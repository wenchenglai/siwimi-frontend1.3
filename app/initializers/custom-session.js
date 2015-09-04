import Ember from "ember";
import DS from 'ember-data';
import Session from "simple-auth/session";

export function initialize(container, application) {
    Ember.debug('Custom-Session Initializer runs.');
    Session.reopen({
        getUserDetails: function () {
            var self = this,
                secure = self.get('secure'),
                id = self.get("secure.id");

            if (!Ember.isEmpty(id)) {
                if (!secure.user.get) {
                    return container.lookup("service:store").findRecord("member", id).then(function(user) {
                        self.set("secure.user", user);
                    });
                    //return DS.PromiseObject.create({
                    //    promise: container.lookup('service:store').findRecord('member', id)
                    //});
                }
            }
        }.observes("secure.id")
    });
}

export default {
  name: 'custom-session',
  before: "simple-auth",
  initialize: initialize
};
