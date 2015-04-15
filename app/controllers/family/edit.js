import Ember from 'ember';

export default Ember.Controller.extend({
    disabled: function () {
        return Ember.isEmpty(this.get('model.zipCode'));
    }.property('model.zipCode'),
});
