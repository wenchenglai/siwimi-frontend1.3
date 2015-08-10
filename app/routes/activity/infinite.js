import Ember from 'ember';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(InfinityRoute, {
    model: function (status, type) {
        var self = this,
            session = self.get('session'),
            userId = self.get('session.secure.id');

        if (typeof(status) !== "string") {
            status = 'all';
        }

        if (typeof(type) !== "string") {
            type = 'all';
        }
        /* Load pages of the Product Model, starting from page 1, in groups of 12. */
        return this.infinityModel("activity", { status: status, type: type, requester: userId, longitude: session.get('longitude'), latitude: session.get('latitude'), perPage: 1, startingPage: 1 });
    }
});
