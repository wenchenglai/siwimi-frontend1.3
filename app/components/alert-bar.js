import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        closeAlert: function () {
            this.sendAction('closeAlert');
        }
    }
});
