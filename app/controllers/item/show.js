import Ember from 'ember';

export default Ember.ObjectController.extend({
    showEdit: function() {
        if (Ember.isEmpty(this.get('creator'))) {
            if (this.get('session').isAuthenticated) {
                return true;
            } else {
                return false;
            }
        } else {
            return this.get('creator').get('id') === this.get('session').get('id');
        }
    }.property('creator')
});
