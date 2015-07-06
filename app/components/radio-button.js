import Ember from 'ember';

export default Ember.Component.extend({
  btnClassName: "btn-default",
  classNameBindings: [':btn', 'btnClassName', ':radioButtonGroup', 'isActive:active'],
  attributeBindings: ['name', 'group'],

  click: function () {
    var self = this,
      group = self.get('group');

      self.set("selectedValue", self.get('value'));

      Ember.$('div.radioButtonGroup[group=' + group + ']').removeClass('active');
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
