import Ember from 'ember';
import StatesDataMixin from '../../mixins/states-data';

export default
Ember.Controller.extend(StatesDataMixin, {
    allAges: [0, 1, 2, 3, 4, 5, 6],

    disabled: function () {
        return Ember.isEmpty(this.get('model.title')) || Ember.isEmpty(this.get('model.description'));
    }.property('model.title', 'model.description'),

    isCloth: function() {
        return this.get('model.type') === 'cloth';
    }.property('model.type'),

    isFurniture: function() {
        return (this.get('model.type') === 'furniture' || this.get('model.type') === 'equipment');
    }.property('model.type')
});
