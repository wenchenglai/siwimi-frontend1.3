import Ember from 'ember';

export default Ember.Controller.extend({
    disabled: function () {
        return Ember.isEmpty(this.get('email')) || Ember.isEmpty(this.get('password'));
    }.property('email', 'password'),
});
