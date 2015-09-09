import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: ['userId'],

    disabled: function() {
        return Ember.isEmpty(this.get('model.email')) ||
            Ember.isEmpty(this.get('model.lastName')) ||
            Ember.isEmpty(this.get('model.firstName')) ||
            Ember.isEmpty(this.get('model.password')) ||
            Ember.isEmpty(this.get('password2'));
    }.property('model.email', 'model.lastName', 'model.firstName', 'model.password', 'password2'),
});
