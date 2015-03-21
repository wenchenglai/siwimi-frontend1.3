import Ember from 'ember';

export default Ember.ObjectController.extend({
    queryText: null,
    showData: false,

    hasData: function() {
        if (this.get('model')) {
            return this.get('model').get('length') > 0;
        }
        return false;
    }.property('model.length')
});
