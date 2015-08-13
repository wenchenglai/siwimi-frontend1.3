import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        id: {
            refreshModel: true
        },
        action: {
            refreshModel: true
        }
    },

    model: function(params) {
        if (!Ember.isEmpty(params.action)) {
            if (params.action === "confirm") {
                return this.store.find('member', params);
            }
        } else {
            return this.store.findRecord('member', params.id);
        }
    }
});
