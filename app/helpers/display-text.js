import Ember from 'ember';

export function displayText(input, collection) {
    var ret = "";
    if (input) {
        ret = window._.find(collection, function(obj) { return obj.value === input; }).text;        
    }
    return ret;
}

export default Ember.Handlebars.makeBoundHelper(displayText);
