import Ember from 'ember';
import SearchDataMixin from 'xiwami-parents/mixins/search-data';

module('SearchDataMixin');

// Replace this with your real tests.
test('it works', function() {
  var SearchDataObject = Ember.Object.extend(SearchDataMixin);
  var subject = SearchDataObject.create();
  ok(subject);
});
