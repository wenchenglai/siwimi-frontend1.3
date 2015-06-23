import Ember from 'ember';
import TipDataMixin from '../../mixins/tip-data';

export default Ember.Controller.extend(TipDataMixin, {
    showEdit: function() {
        if (!Ember.isEmpty(this.get('creator'))) {
            return this.get('creator.id') === this.get('session.id');
        } else {
            return false;
        }
    }.property()
});
