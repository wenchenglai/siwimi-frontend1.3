import Ember from 'ember';
import ValidateUtilityMixin from '../../../mixins/validate-utility';
import { module, test } from 'qunit';

module('ValidateUtilityMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var ValidateUtilityObject = Ember.Object.extend(ValidateUtilityMixin);
  var subject = ValidateUtilityObject.create();
  assert.ok(subject);
});
