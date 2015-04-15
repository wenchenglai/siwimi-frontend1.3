import Ember from 'ember';

export default Ember.View.extend({
    didInsertElement: function () {
        var self = this,
            controller = self.get('controller');

        $("#myTags").tagit({
            availableTags: controller.get('friendList')
        });
    },
});
