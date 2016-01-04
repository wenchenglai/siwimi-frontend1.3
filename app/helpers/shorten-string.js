import Ember from 'ember';

export function shortenString(input, size) {
    if (input) {
        var default_size = 40;

        if (!size) {
            default_size = size;
        }
        if (input.length > default_size) {
            return input.substring(0, default_size) + "...";
        } else {
            return input;
        }
    } else {
        return "";
    }
}

export default Ember.Handlebars.makeBoundHelper(shortenString);
