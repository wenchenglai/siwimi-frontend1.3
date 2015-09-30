import Ember from 'ember';

export default Ember.Component.extend({
    isHidingPostBoxFake: false,
    disabled: function() {
        return Ember.isEmpty(this.get('title')) || Ember.isEmpty(this.get('description')) || Ember.isEmpty(this.get('selectedType'));
    }.property('title', 'description', 'selectedType'),
    actions: {
        hidePostBoxFake: function() {
            this.set('isHidingPostBoxFake', true);
        },

        hidePostBoxReal: function() {
            this.set('isHidingPostBoxFake', false);
        },

        doPost: function() {
            this.sendAction('action', this.get('title'), this.get('description'), this.get('selectedType'));
        },

        setType: function(type) {
            this.set('selectedType', type);
        }
    }
});
