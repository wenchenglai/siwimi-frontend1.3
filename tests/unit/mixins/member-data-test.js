import Ember from 'ember';
import MemberDataMixin from '../../../mixins/member-data';
import { module, test } from 'qunit';

module('MemberDataMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var MemberDataObject = Ember.Object.extend(MemberDataMixin);
  var subject = MemberDataObject.create();
  assert.ok(subject);
});
