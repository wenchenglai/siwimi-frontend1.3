import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        filterSelected: function (value) {
            this.sendAction('apiFilterSelected', value);
        }
    }
});
