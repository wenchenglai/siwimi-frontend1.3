import Ember from 'ember';
import CommonDataMixin from '../../mixins/common-data';

export default Ember.Controller.extend(CommonDataMixin, {
    queryText: null,
    distance: null,
    showData: false,
    hasData: function() {
        if (this.get('model')) {
            return this.get('model').get('length') > 0;
        }
        return false;
    }.property('model.length')
});
