import Ember from 'ember';

export function displayText(input, collection) {
    var a = collection[input];

    return a;
}

export default Ember.Handlebars.makeBoundHelper(displayText);
