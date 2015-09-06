import Ember from 'ember';

export default Ember.Component.extend({
    isHidingPostBoxFake: false,
    actions: {
        hidePostBoxFake: function() {
            this.set('isHidingPostBoxFake', true);
        },

        hidePostBoxReal: function() {
            this.set('isHidingPostBoxFake', false);
        },

        doPost: function() {
            this.sendAction('action', this.get('title'), this.get('description'));
        }
    }
});
