import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['btn-group'],
    selected: null,
    actions: {
        choose: function(item) {
            this.set('selected', item);
            this.sendAction();
        }
    }
});
