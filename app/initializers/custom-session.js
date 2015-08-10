import Ember from "ember";
import DS from 'ember-data';
import Session from "simple-auth/session";

export function initialize(container /*, application */) {
    Session.reopen({
        getUserDetails: function getUserDetails() {
            var self = this,
                //secure = self.get('secure'),
                id = self.get("secure.id");
                //previousId = self.get("secure.user.id");

            if (!Ember.isEmpty(id)) {
                //if (previousId !== id) {
                    return container.lookup("service:store").findRecord("member", id).then(function(user) {
                        self.set("user", user);
                    });
                    //return DS.PromiseObject.create({
                    //    promise: container.lookup('service:store').findRecord('member', id)
                    //});
                //}
            }
        }.observes("secure.id")
    });
}

export default {
  name: 'custom-session',
  before: "simple-auth",
  initialize: initialize
};
