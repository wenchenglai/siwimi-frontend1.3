import Ember from 'ember';
import ActivityDataMixin from '../../mixins/activity-data';
import StatesDataMixin from '../../mixins/states-data';

export default Ember.ObjectController.extend(ActivityDataMixin, StatesDataMixin, {
    disabled: function () {
        return Ember.isEmpty(this.get('title')) || Ember.isEmpty(this.get('description'));
    }.property('title', 'description'),
});