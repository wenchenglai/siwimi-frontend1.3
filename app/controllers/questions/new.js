import Ember from 'ember';

export default Ember.Controller.extend({
    disabled: function() {
        return Ember.isEmpty(this.get('model.title'));
    }.property('model.title'),
    
    asked: false
});
