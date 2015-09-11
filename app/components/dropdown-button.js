import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['btn-group'],
    actions: {
        chooseType: function(type) {
            this.sendAction('action', type);
        }
    }
});
