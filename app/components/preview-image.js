import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'img',
  attributeBindings: ['name', 'width', 'height', 'src', 'onerror']
});

