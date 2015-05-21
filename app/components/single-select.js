import Ember from 'ember';

export default Ember.Component.extend({
  btnClassName: "btn-default",
  classNameBindings: ['btnClassName', 'isActive:active'],

  attributeBindings: ['group'],

  click: function () {
    var self = this,
        group = self.get('group');

    self.set("selectedValue", self.get('value'));
  },

  isActive: function () {
    var flag = this.get("value") === this.get("selectedValue");
    return flag;
  }.property('selectedValue')
});
