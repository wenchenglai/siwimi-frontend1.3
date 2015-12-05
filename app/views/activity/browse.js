import Ember from 'ember';

export default Ember.View.extend({
    didInsertElement: function () {
        if (Ember.$('.pagination li.active').length === 0) {
            Ember.$('.pagination li:nth-child(2)').addClass("active");
        }
    }
});
