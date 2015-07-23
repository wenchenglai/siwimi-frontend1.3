import Ember from 'ember';

export default Ember.Controller.extend({
    disabled: function () {
        return Ember.isEmpty(this.get('email')) || Ember.isEmpty(this.get('description'));
    }.property('email', 'description')
});
