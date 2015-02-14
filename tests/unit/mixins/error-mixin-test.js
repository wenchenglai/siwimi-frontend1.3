import Ember from 'ember';
import ErrorMixinMixin from 'xiwami-parents/mixins/error-mixin';

module('ErrorMixinMixin');

// Replace this with your real tests.
test('it works', function() {
  var ErrorMixinObject = Ember.Object.extend(ErrorMixinMixin);
  var subject = ErrorMixinObject.create();
  ok(subject);
});
