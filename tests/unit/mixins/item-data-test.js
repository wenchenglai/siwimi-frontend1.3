import Ember from 'ember';
import ItemDataMixin from 'xiwami-parents/mixins/item-data';

module('ItemDataMixin');

// Replace this with your real tests.
test('it works', function() {
  var ItemDataObject = Ember.Object.extend(ItemDataMixin);
  var subject = ItemDataObject.create();
  ok(subject);
});
