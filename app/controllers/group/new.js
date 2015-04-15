import Ember from 'ember';

export default Ember.Controller.extend({
    disabled: function () {
        return Ember.isEmpty(this.get('title'));
    }.property('title'),
});
