import Ember from 'ember';
import CommonDataMixin from '../../mixins/common-data';
import ActivityDataMixin from '../../mixins/activity-data';
import StatesDataMixin from '../../mixins/states-data';

export default Ember.Controller.extend(CommonDataMixin, ActivityDataMixin, StatesDataMixin, {
    times: ['12:00am', '12:30am', '1:00am', '1:30am', '2:00am'],
    isDisabled: false,
    disabled: function () {
        return Ember.isEmpty(this.get('model.title')) || Ember.isEmpty(this.get('model.description')) || this.get('isDisabled');
    }.property('model.title', 'model.description'),
    selectedTime: null,
    actions: {
        focus: function() {
            debugger;
        },

        change: function(a, b) {
            debugger;
        },

        close: function() {
            debugger;
        },

        search: function(a, b) {
            debugger;
        }
    }
});