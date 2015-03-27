import Ember from 'ember';

export default Ember.ObjectController.extend({
    disabled: function () {
        return Ember.isEmpty(this.get('title'));
    }.property('title'),
});
