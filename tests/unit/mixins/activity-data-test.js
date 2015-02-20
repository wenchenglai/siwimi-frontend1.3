import Ember from 'ember';
import ActivityDataMixin from 'xiwami-parents/mixins/activity-data';

module('ActivityDataMixin');

// Replace this with your real tests.
test('it works', function() {
  var ActivityDataObject = Ember.Object.extend(ActivityDataMixin);
  var subject = ActivityDataObject.create();
  ok(subject);
});
