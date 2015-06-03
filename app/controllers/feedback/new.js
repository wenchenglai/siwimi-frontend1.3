import Ember from 'ember';

export default Ember.Controller.extend({
    disabled: function () {
        return Ember.isEmpty(this.get('model.creator.email')) || Ember.isEmpty(this.get('model.feedback.description'));
    }.property('model.creator.email', 'model.feedback.description')
});
