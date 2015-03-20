import Ember from 'ember';

export function shortenString(input, size) {
    if (input) {
        if (input.length > size) {
            return input.substring(0, size) + "...";
        } else {
            return input;
        }
    } else {
        return "";
    }
}

export default Ember.Handlebars.makeBoundHelper(shortenString);
