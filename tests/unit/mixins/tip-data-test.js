import Ember from 'ember';
import TipDataMixin from 'xiwami-parents/mixins/tip-data';

module('TipDataMixin');

// Replace this with your real tests.
test('it works', function() {
  var TipDataObject = Ember.Object.extend(TipDataMixin);
  var subject = TipDataObject.create();
  ok(subject);
});
