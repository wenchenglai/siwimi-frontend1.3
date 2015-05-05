import Ember from 'ember';
import PagingMixinMixin from '../../../mixins/paging-mixin';
import { module, test } from 'qunit';

module('PagingMixinMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var PagingMixinObject = Ember.Object.extend(PagingMixinMixin);
  var subject = PagingMixinObject.create();
  assert.ok(subject);
});
