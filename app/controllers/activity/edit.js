import Ember from 'ember';
import ActivityDataMixin from '../../mixins/activity-data';

export default Ember.ObjectController.extend(ActivityDataMixin,{
    disabled: function () {
        return Ember.isEmpty(this.get('title')) || Ember.isEmpty(this.get('description'));
    }.property('title', 'description'),
});