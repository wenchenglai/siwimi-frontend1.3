import Ember from 'ember';

export default Ember.Component.extend({
    isHidingPostBoxReal: true,

    actions: {
        hidePostBoxReal: function() {
            this.sendAction();
        },

        addPost: function() {
            this.sendAction('action', this.get('title'), this.get('description'));
        }
    }
});
