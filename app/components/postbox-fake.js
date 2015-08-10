import Ember from 'ember';

export default Ember.Component.extend({
    isHidingPostBoxFake: false,
    actions: {
        hideBox: function() {
            this.set('isHidingPostBoxFake', true);
            this.sendAction();
        }
    }
});
