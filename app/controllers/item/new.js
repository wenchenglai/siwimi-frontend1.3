import Ember from 'ember';

export default Ember.ObjectController.extend({
    allAges: [0, 1, 2, 3, 4, 5, 6],

    disabled: function () {
        return Ember.isEmpty(this.get('title')) || Ember.isEmpty(this.get('description'));
    }.property('title', 'description'),
});
