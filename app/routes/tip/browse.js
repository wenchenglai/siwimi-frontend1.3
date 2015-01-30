import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        var self = this,
            session = self.get('session'),
            controller = self.controllerFor('tip.browse');

        return this.store.find('tip', { status: controller.get('statusType'), type: controller.get('tipType'), longitude: session.get('longitude'), latitude: session.get('latitude') });
    },

    actions: {
        loadData: function () {
            this.model();
        }
    }
});
