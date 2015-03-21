import Ember from 'ember';
import CommonDataMixin from '../../mixins/common-data';
import ItemDataMixin from '../../mixins/item-data';

export default Ember.ArrayController.extend(CommonDataMixin, ItemDataMixin, {

});
