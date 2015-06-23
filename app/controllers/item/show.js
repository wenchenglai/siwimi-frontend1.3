import Ember from 'ember';
import ItemDataMixin from '../../mixins/item-data';

export default Ember.Controller.extend(ItemDataMixin, {
  showEdit: function() {
    if (!Ember.isEmpty(this.get('creator'))) {
      return this.get('creator.id') === this.get('session.id');
    } else {
      return false;
    }
  }.property()
});
