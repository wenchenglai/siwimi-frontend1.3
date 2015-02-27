import Ember from 'ember';
import CommonDataMixin from '../../mixins/common-data';
import ActivityDataMixin from '../../mixins/activity-data';

export default Ember.ObjectController.extend(CommonDataMixin, ActivityDataMixin,{
    disabled: function () {
        return Ember.isEmpty(this.get('title')) || Ember.isEmpty(this.get('description'));
    }.property('title', 'description'),
});