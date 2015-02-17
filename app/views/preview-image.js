import Ember from 'ember';

export default Ember.View.extend({
    attributeBindings: ['name', 'width', 'height', 'src'],
    tagName: 'img',
});
