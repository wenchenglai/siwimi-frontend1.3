import Ember from 'ember';

export function displayText(input, collection) {
    var ret = "";
    if (input) {
        ret = collection[input];
    }
    return ret;
}

export default Ember.Handlebars.makeBoundHelper(displayText);
