import Ember from 'ember';

export default Ember.View.extend({
    didInsertElement: function () {
        Ember.$('.pagination li:nth-child(2)').addClass("active");
    }
});
