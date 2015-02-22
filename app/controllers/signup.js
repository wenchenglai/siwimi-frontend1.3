import Ember from 'ember';

export default Ember.Controller.extend({
    disabled: function() {
        return Ember.isEmpty(this.get('email')) || Ember.isEmpty(this.get('password')) ||  Ember.isEmpty(this.get('password2'));
    }.property('email', 'password', 'password2'),
});
