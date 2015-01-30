import Ember from 'ember';

export default Ember.View.extend({
    classNameBindings: [':btn', ':btn-info', 'isSelected'],
    //selection: '',
    attributeBindings: ['name'],
    click: function () {
        //debugger;
        this.set("selection", this.get('value'));
    },
    isSelected: function () {
        //debugger;
        var flag = this.get("value") == this.get("selection");
        var selector = 'div[name=' + this.get('name') + ']';

        if (!flag) {
            if (Em.$(selector).hasClass('active')) {
                Em.$(selector).removeClass('active');
            }
        } else {
            //if (!Em.$(selector).hasClass('active')) {
            //    Em.$(selector).addClass('active');
            //}
        }

        return flag;
    }.property('selection'),
    didInsertElement: function () {

        //var gender = this.get('controller').get('gender');
        //if (gender) {
        //    var selector = 'div[name=selectionFemale]';
        //    if (gender === "male") {
        //        selector = 'div[name=selectionMale]';
        //    }

        //    if (!Em.$(selector).hasClass('active')) {
        //        Em.$(selector).addClass('active');
        //    }
        //}
        //var flag = this.get("value") == this.get("selection");
        //var selector = 'div[name=' + this.get('name') + ']';

        //if (!flag) {
        //    if (Em.$(selector).hasClass('active')) {
        //        Em.$(selector).removeClass('active');
        //    }
        //} else {
        //    if (!Em.$(selector).hasClass('active')) {
        //        Em.$(selector).addClass('active');
        //    }
        //}
    },
});