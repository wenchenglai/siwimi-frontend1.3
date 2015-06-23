import Ember from 'ember';
import ActivityDataMixin from '../../mixins/activity-data';

export default Ember.Controller.extend(ActivityDataMixin, {
    color: null,
    showEdit: function() {
      if (!Ember.isEmpty(this.get('creator'))) {
        return this.get('creator.id') === this.get('session.id');
      } else {
        return false;
      }
    }.property()
});
