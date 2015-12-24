import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    classNames: ['fb-share-button'],
    attributeBindings: [
        'data-href',
        'data-layout',
        'data-action',
        'data-show-faces',
        'data-share'
    ],

    onDidInsertElement: function() {
        // This is needed to make the FB SDK accept the component rendered HTML even though child nodes due to databinding exists
        // To understand more about this, follow the code inside connect.facebook.net/en_US/all/debug.js
        // 1: Read up on the function FB.XFBML.parse, found by searching for: 'function parse(/*DOMElement*/ dom'
        // 2: Read up on the function html5Info, whos returnvalue will be affected, found by searching for: 'function html5Info('
        // 3: Notice the conditional inside html5Info containing the booleans below:
        //        element.childNodes.length === 0           --- supposed to evaluate to true, but isn't due to childNodes used for databinding
        //        element.getAttribute('fb-xfbml-state')    --- used to make sure that the conditional becomes true for the component
        document.getElementById(this.get('elementId')).setAttribute('fb-xfbml-state', 'rendered');

        // This makes FB-SDK render the HTML-stubs inserted by the ember components
        Ember.run.debounce(this, FB.XFBML.parse, 100);
    }.on('didInsertElement'),
});
