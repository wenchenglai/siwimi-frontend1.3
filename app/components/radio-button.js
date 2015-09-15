import Ember from 'ember';

export default Ember.Component.extend({
    btnClassName: "btn-default",
    classNameBindings: [':btn', 'btnClassName', ':radioButtonGroup', 'isActive:active'],
    attributeBindings: ['name', 'group'],

    click: function () {
        var self = this,
            group = self.get('group'),
            selectedValue = self.get('value');

        self.set("selectedValue", selectedValue);

        Ember.$('div.radioButtonGroup[group=' + group + ']').removeClass('active');

        this.sendAction('action', selectedValue);
    },

    isActive: false,

    didInsertElement: function () {
        var self = this,
            flag = self.get("value") === self.get("selectedValue");

        if (flag) {
            // set the original state
            self.set('isActive', true);
        }
    }
});
