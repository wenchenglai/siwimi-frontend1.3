import Ember from 'ember';

export default Ember.Component.extend({
    isHidingPostBoxFake: false,
    actions: {
        hidePostBoxFake: function() {
            this.set('isHidingPostBoxFake', true);
            this.sendAction();
        },

        hidePostBoxReal: function() {
            this.set('isHidingPostBoxFake', false);
            this.sendAction();
        },

        addPost: function() {
            this.sendAction('action', this.get('title'), this.get('description'));
        }
    }
});
