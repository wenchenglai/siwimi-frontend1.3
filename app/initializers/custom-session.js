import Ember from "ember";
import Session from "simple-auth/session";

export function initialize(container /*, application */) {
    Session.reopen({
        setCurrentUser: function() {
            var self = this,
                id = self.get("id");

            if (!Ember.isEmpty(id)) {
                return container.lookup("service:store").find("member", id).then(function(user) {
                    self.set("currentUser", user);
                });
            }
        }.observes("id")
    });
}

export default {
  name: 'custom-session',
  before: "simple-auth",
  initialize: initialize
};
