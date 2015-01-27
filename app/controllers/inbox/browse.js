import Ember from 'ember';

export default Ember.ArrayController.extend({
    isAllChecked: false,

    watchAllChecked: function(){
        var self = this,
            model = self.get('model');

        for (var i = 0; i < model.get('length'); i++) {
            model.content[i].set('isChecked', self.get('isAllChecked'));
        }
    }.observes('isAllChecked'),

    actions: {
        checkAll: function() {
            var self = this,
                model = self.get('model');

            for (var i = 0; i < model.length; i++) {
                model.set('isChecked', true);
            }
        }
    },
});
