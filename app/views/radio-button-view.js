import Ember from 'ember';

export default Ember.View.extend({
    classNameBindings: [':btn', ':btn-info', 'active'],

    attributeBindings: ['name'],

    click: function () {
        this.set("selection", this.get('value'));

        // a hack here, due to the fact that bootstrap javascrit will add "active" class automatically when click
        if (this.get('value') == 'male') {
            Em.$('div[name=female]').removeClass('active');
        } else {
            Em.$('div[name=male]').removeClass('active');
        }
    },

    active: function () {
        var flag = this.get("value") === this.get("selection");
        var selector = 'div[name=' + this.get('name') + ']';

        if (!flag) {
            if (Em.$(selector).hasClass('active')) {
                Em.$(selector).removeClass('active');
            }
        }

        return flag;
    },

    didInsertElement: function () {
        var flag = this.get("value") === this.get("selection");
        var selector = 'div[name=' + this.get('name') + ']';

        if (!flag) {
            if (Em.$(selector).hasClass('active')) {
                Em.$(selector).removeClass('active');
            }
        } else {
            //if (!Em.$(selector).hasClass('active')) {
            Em.$(selector).addClass('active');
            //}
        }
    },
});