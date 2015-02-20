import Ember from 'ember';
import CommonDataMixin from '../../mixins/common-data';

export default Ember.ArrayController.extend(CommonDataMixin, {
    showResult: false,
    queryText: null,
    distance: null,
    actions: {
        search: function () {
            var self = this,
                session = self.get('session'),
                userId = self.get('session.id'),
                query = {
                    requester: userId,
                    queryText: self.get('queryText'),
                    longitude: session.get('longitude'),
                    latitude: session.get('latitude'),
                    distance: self.get('distance')
                };

            self.set('showResult', true);
            self.store.find('item', query).then(function(items) {
                self.set('model', items.get('content'));
            });
        }
    }
});
