import Ember from 'ember';
import PagingMixin from '../../../mixins/paging';
import { module, test } from 'qunit';

module('PagingMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var PagingObject = Ember.Object.extend(PagingMixin);
  var subject = PagingObject.create();
  assert.ok(subject);
});
