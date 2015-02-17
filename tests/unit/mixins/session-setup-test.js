import Ember from 'ember';
import SessionSetupMixin from 'xiwami-parents/mixins/session-setup';

module('SessionSetupMixin');

// Replace this with your real tests.
test('it works', function() {
  var SessionSetupObject = Ember.Object.extend(SessionSetupMixin);
  var subject = SessionSetupObject.create();
  ok(subject);
});
