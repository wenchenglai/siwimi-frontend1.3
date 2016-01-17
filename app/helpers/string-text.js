import Ember from 'ember';

export function stringText(htmlInput) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = htmlInput;

    return tmp.textContent || tmp.innerText || "";
}

export default Ember.HTMLBars.makeBoundHelper(stringText);
