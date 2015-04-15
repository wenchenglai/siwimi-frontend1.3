import Ember from 'ember';
import CommonDataMixin from '../../mixins/common-data';
import ActivityDataMixin from '../../mixins/activity-data';
import StatesDataMixin from '../../mixins/states-data';

export default Ember.Controller.extend(CommonDataMixin, ActivityDataMixin, StatesDataMixin, {
    isDisabled: false,
    disabled: function () {
        return Ember.isEmpty(this.get('title')) || Ember.isEmpty(this.get('description') || this.get('isDisabled') );
    }.property('title', 'description')
});