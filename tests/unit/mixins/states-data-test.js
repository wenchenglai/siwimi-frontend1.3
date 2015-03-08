import Ember from 'ember';
import StatesDataMixin from 'xiwami-parents/mixins/states-data';

module('StatesDataMixin');

// Replace this with your real tests.
test('it works', function() {
  var StatesDataObject = Ember.Object.extend(StatesDataMixin);
  var subject = StatesDataObject.create();
  ok(subject);
});
