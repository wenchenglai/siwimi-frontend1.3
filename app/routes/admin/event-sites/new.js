import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        var self = this,
            session = self.get('session');

        return self.store.createRecord('activitySite');
    },

    actions: {
        save: function () {
            var self = this,
                model = self.currentModel;

            model.save().then((record) => {
                self.store.unloadRecord(record);
                this.transitionTo('admin.eventSites.list');
            });
        }
    }
});
