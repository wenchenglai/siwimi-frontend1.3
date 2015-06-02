import Ember from 'ember';

/*
This view is used as single selection buttons group
TODO: convert into a component
TODO: need to allow multi-selection on certain features
*/

export default Ember.View.extend({
    btnClassName: "btn-default",
    classNameBindings: [':btn', 'btnClassName', ':radioButtonGroup', 'isActive:active'],

    attributeBindings: ['name', 'group'],

    click: function () {
        var self = this,
            group = self.get('group');

        self.set("selectedValue", self.get('value'));

        // 2015-05-07 Due to Bootstrap Button's default behavior of toggle a button (add active class)
        // I must manually remove all the active classes on other buttons
        Ember.$('div.radioButtonGroup[group=' + group + ']').removeClass('active');
    },

    isActive: false,

    // 2015-05-07 We should use computed property to set all buttons's active state,
    // but due to Bootstrap's default button behavior that will add active class on a click event on a target button,
    // we cannot use this more elegant way of coding below.
    //isActive: function () {
    //    var flag = this.get("value") === this.get("selection");
    //    //return flag;
    //}.property('selection'),

    didInsertElement: function () {
        var self = this,
            flag = self.get("value") === self.get("selectedValue");

        if (flag) {
            // set the original state
            self.set('isActive', true);
        }
    }
});
