import Ember from 'ember';
import StatesDataMixin from '../../mixins/states-data';

export default
Ember.Controller.extend(StatesDataMixin, {
    allAges: [0, 1, 2, 3, 4, 5, 6],

    disabled: function () {
        return Ember.isEmpty(this.get('title')) || Ember.isEmpty(this.get('description'));
    }.property('title', 'description'),

    isCloth: function() {
        return this.get('type') === 'cloth';
    }.property('type'),

    isFurniture: function() {
        return (this.get('type') === 'furniture' || this.get('type') === 'equipment');
    }.property('type')
});
