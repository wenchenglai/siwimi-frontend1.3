import Ember from 'ember';
import CommonDataMixin from '../../mixins/common-data';
import ActivityDataMixin from '../../mixins/activity-data';
import StatesDataMixin from '../../mixins/states-data';

export default Ember.Controller.extend(CommonDataMixin, ActivityDataMixin, StatesDataMixin, {
    isDisabled: false,
    disabled: function () {
        return Ember.isEmpty(this.get('model.title')) || Ember.isEmpty(this.get('model.description')) || this.get('isDisabled');
    }.property('model.title', 'model.description'),
    selectedTime: null,
    actions: {
        focus: function() {

        },

        change: function() {

        },

        close: function() {

        },

        search: function() {

        }
    }
});